import React, { useState, useEffect, useRef } from "react";
import ChatLayout from "../../layouts/ChatLayout";
import Chat from "components/chat/Chat";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const ChatPage = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.uid; // 올바른 필드 사용
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isMessageSent, setIsMessageSent] = useState(false); // 메시지 전송 상태 추적

  console.log("selectedRoom: " + JSON.stringify(selectedRoom));

  // WebSocket 연결 설정
  useEffect(() => {
    const socket = new SockJS(`${url}/ws/chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      setStompClient(client); // WebSocket 연결 후 stompClient 설정
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
  }, [uid]); // uid가 변경될 때만 useEffect 실행

  // 채팅방 선택 시 메시지 구독 설정 및 초기 메시지 로드
  useEffect(() => {
    if (stompClient && selectedRoom) {
      const subscription = stompClient.subscribe(
        `/topic/chatroom/${selectedRoom.chatNo}`, // 구독하는 채팅방의 경로 설정
        (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]); // 새 메시지를 상태에 추가
        }
      );

      stompClient.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify({ uid }),
      });

      return () => {
        subscription.unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
      };
    }
  }, [selectedRoom, stompClient, uid]); // selectedRoom, stompClient, uid가 변경될 때만 useEffect 실행

  // 채팅방 조회 및 메시지 초기화
  const handleSelectChatRoom = async (room) => {
    setSelectedRoom(room);
    setMessages([]); // 이전 메시지 초기화
    try {
      const response = await axios.get(`/api/chatroom/${room.chatNo}`);
      setMessages(response.data); // 새로운 채팅방의 메시지 설정
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

      // 메시지 전송
      stompClient.publish({
        destination: `/app/chat.sendMessage/${selectedRoom.chatNo}`,
        body: JSON.stringify(chatMessage),
      });

      // 메시지 전송 상태 업데이트
      setIsMessageSent(true);
    }
  };

  // WebSocket을 통해 수신된 메시지로 상태 업데이트
  useEffect(() => {
    if (isMessageSent) {
      setIsMessageSent(false); // 전송 상태 초기화
    }
  }, [messages]);

  return (
    <div className="chat-layout-container">
      <ChatLayout setSelectedRoom={handleSelectChatRoom}>
        <Chat
          messages={messages}
          onSendMessage={handleSendMessage}
          uid={uid}
          roomTitle={selectedRoom ? selectedRoom.title : "Chat"} // 채팅방 제목 표시
        />
      </ChatLayout>
    </div>
  );
};

export default ChatPage;
