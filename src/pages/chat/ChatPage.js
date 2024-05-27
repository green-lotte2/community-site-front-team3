import React, { useState, useEffect } from "react";
import ChatLayout from "../../layouts/ChatLayout";
import Chat from "components/chat/Chat";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import Aside from "components/chat/Aside";

const ChatPage = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.username;
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws/chat");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected");

      client.subscribe("/topic/public", (message) => {
        const msg = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      client.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify({ uid }),
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [uid]);

  const handleSendMessage = (text) => {
    if (stompClient && stompClient.connected) {
      const chatMessage = {
        uid: uid,
        message: text,
      };
      console.log("chatMessage : " + JSON.stringify(chatMessage));
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
    }
  };

  const handleAddChatRoom = () => {
    const newRoomName = prompt("Enter chat room name:");
    if (newRoomName) {
      const newRoom = { id: chatRooms.length + 1, name: newRoomName };
      setChatRooms([...chatRooms, newRoom]);
    }
  };

  return (
    <ChatLayout>
      <Aside chatRooms={chatRooms} onAddChatRoom={handleAddChatRoom} />
      <Chat messages={messages} onSendMessage={handleSendMessage} uid={uid} />
    </ChatLayout>
  );
};

export default ChatPage;
