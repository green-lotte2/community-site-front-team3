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
  const uid = authSlice.uid;
  const name = authSlice.name;
  const profile = authSlice.profile; // 프로필 추가
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatNo, setChatNo] = useState("");

  const stompClientRef = useRef(null); // WebSocket 클라이언트 참조를 추가
  const subscriptionRef = useRef(null); // 구독 참조 추가

  console.log("selectedRoom: " + JSON.stringify(selectedRoom));
  console.log("profile: ", profile); // 프로필 정보 로그 추가

  useEffect(() => {
    if (selectedRoom) {
      setChatNo(selectedRoom.chatNo);
    }
  }, [selectedRoom]);

  useEffect(() => {
    const setupWebSocket = () => {
      if (selectedRoom) {
        // 기존 WebSocket 연결 해제
        if (stompClientRef.current) {
          if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
          }
          stompClientRef.current.deactivate();
          stompClientRef.current = null;
        }

        const socket = new SockJS(`${url}/ws/chat`);
        const client = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
        });

        client.onConnect = () => {
          console.log("Connected to WebSocket");
          stompClientRef.current = client;

          subscriptionRef.current = client.subscribe(
            `/topic/chatroom/${selectedRoom.chatNo}`,
            (message) => {
              const msg = JSON.parse(message.body);
              console.log("WebSocket message received:", msg);
              setMessages((prevMessages) => {
                if (
                  !prevMessages.some(
                    (m) => m.cmNo === msg.cmNo && m.cDate === msg.cDate
                  )
                ) {
                  return [...prevMessages, msg];
                }
                return prevMessages;
              });
            }
          );

          client.publish({
            destination: "/app/chat.addUser",
            body: JSON.stringify({ uid, name, profile }),
          });
        };

        client.onStompError = (frame) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        };

        client.activate();
      }
    };

    setupWebSocket();

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClientRef.current) {
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
        }
        stompClientRef.current.deactivate();
      }
    };
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${url}/chat/messages?chatNo=${selectedRoom.chatNo}`
          );
          console.log("Fetched messages:", response.data); // 메시지 데이터 로그 추가
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching chat room messages", error);
        }
      };

      fetchMessages();
    }
  }, [selectedRoom]);

  const handleSelectChatRoom = async (room) => {
    console.log("Chat room selected:", room);
    setSelectedRoom(room);
    setMessages([]);
    try {
      const response = await axios.get(`${url}/chatroom/${room.chatNo}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat room messages", error);
    }
  };

  const onSendMessage = (text, fileMessage) => {
    if (
      stompClientRef.current &&
      stompClientRef.current.connected &&
      selectedRoom
    ) {
      let chatMessage;

      if (fileMessage) {
        chatMessage = {
          ...fileMessage,
          uid: uid,
          name: name,
          profile: profile,
          chatNo: selectedRoom.chatNo,
          cDate: new Date().toISOString(),
        };
      } else {
        chatMessage = {
          uid: uid,
          name: name,
          profile: profile,
          message: text,
          chatNo: selectedRoom.chatNo,
          cDate: new Date().toISOString(),
        };
      }

      console.log("Sending message: ", chatMessage);
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage/${selectedRoom.chatNo}`,
        body: JSON.stringify(chatMessage),
      });

      // 메시지를 전송 후 바로 상태 업데이트
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages.some(
          (m) =>
            m.cDate === chatMessage.cDate && m.message === chatMessage.message
        );
        if (!isDuplicate) {
          return [...prevMessages, chatMessage];
        }
        return prevMessages;
      });
    }
  };

  return (
    <div className="chat-layout-container">
      <ChatLayout setSelectedRoom={handleSelectChatRoom}>
        {!selectedRoom ? (
          <div>채팅방을 선택해주세요</div>
        ) : (
          <Chat
            messages={messages}
            name={name}
            onSendMessage={onSendMessage}
            uid={uid}
            chatNo={chatNo}
            roomTitle={selectedRoom ? selectedRoom.title : "Chat"}
            profile={profile}
          />
        )}
      </ChatLayout>
    </div>
  );
};

export default ChatPage;
