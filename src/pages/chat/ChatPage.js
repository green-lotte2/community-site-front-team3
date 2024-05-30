import React, { useState, useEffect } from "react";
import ChatLayout from "../../layouts/ChatLayout";
import Chat from "components/chat/Chat";
import InviteFriends from "components/chat/InviteFriends";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const ChatPage = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.uid;
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isMessageSent, setIsMessageSent] = useState(false);

  console.log("selectedRoom: " + JSON.stringify(selectedRoom));

  // WebSocket 연결 설정
  useEffect(() => {
    const socket = new SockJS(`${url}/ws/chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected");
      setStompClient(client);
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [uid]);

  // 채팅방 선택 시 메시지 구독 설정 및 초기 메시지 로드
  useEffect(() => {
    if (stompClient && selectedRoom) {
      const subscription = stompClient.subscribe(
        `/topic/chatroom/${selectedRoom.chatNo}`,
        (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      );

      stompClient.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify({ uid }),
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedRoom, stompClient, uid]);

  // 채팅방 조회 및 메시지 초기화
  const handleSelectChatRoom = async (room) => {
    setSelectedRoom(room);
    setMessages([]);
    try {
      const response = await axios.get(`${url}/chatroom/${room.chatNo}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat room messages", error);
    }
  };

  // 메시지 전송
  const handleSendMessage = (text) => {
    if (stompClient && stompClient.connected && selectedRoom) {
      const chatMessage = {
        uid: uid,
        message: text,
        chatNo: selectedRoom.chatNo,
      };
      console.log("Sending chatMessage: ", chatMessage);

      stompClient.publish({
        destination: `/app/chat.sendMessage/${selectedRoom.chatNo}`,
        body: JSON.stringify(chatMessage),
      });

      setIsMessageSent(true);
    }
  };

  useEffect(() => {
    if (isMessageSent) {
      setIsMessageSent(false);
    }
  }, [messages]);

  return (
    <div className="chat-layout-container">
      <ChatLayout setSelectedRoom={handleSelectChatRoom}>
        {!selectedRoom ? (
          <div>채팅방을 선택해주세요</div>
        ) : (
          <>
            <InviteFriends chatRoomId={selectedRoom.chatNo} />
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              uid={uid}
              roomTitle={selectedRoom ? selectedRoom.title : "Chat"}
            />
          </>
        )}
      </ChatLayout>
    </div>
  );
};

export default ChatPage;
