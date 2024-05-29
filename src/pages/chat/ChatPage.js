import React, { useState, useEffect } from "react";
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
  const uid = authSlice.username;
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const socket = new SockJS(`${url}/ws/chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("연결성공");
      setStompClient(client);
    };

    /*
      if (selectedRoom && selectedRoom.chatNo) {
        client.subscribe(
          `/topic/chatroom/${selectedRoom.chatNo}`,
          (message) => {
            const msg = JSON.parse(message.body);
            console.log("New message received: ", msg); // 수신된 메시지 확인
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        );

        client.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({ uid }),
        });
      }
    };
    */

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

  useEffect(() => {
    if (stompClient && selectedRoom) {
      if (subscription) {
        subscription.unsubscribe();
      }

      const newSubscription = stompClient.subscribe(
        `/topic/chatroom/${selectedRoom.chatNo}`,
        (message) => {
          const msg = JSON.parse(message.body);
          console.log("New message received in subscription: ", msg); // 수신된 메시지 확인
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

  const handleSelectChatRoom = async (room) => {
    setSelectedRoom(room);
    setMessages([]);
    try {
      const response = await axios.get(`/api/chatroom/${room.chatNo}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat room messages", error);
    }
  };

  const handleSendMessage = (text) => {
    if (stompClient && stompClient.connected && selectedRoom) {
      const chatMessage = {
        uid: uid,
        message: text,
        chatNo: selectedRoom.chatNo,
      };

      console.log("Sending chatMessage: ", chatMessage); // 전송할 메시지 확인
      stompClient.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify(chatMessage),
      });
    }
  };

  return (
    <div className="chat-layout-container">
      <ChatLayout setSelectedRoom={handleSelectChatRoom}>
        <Chat messages={messages} onSendMessage={handleSendMessage} uid={uid} />
      </ChatLayout>
    </div>
  );
};

export default ChatPage;
