import React from "react";
import ChatLayout from "../../layouts/ChatLayout";
import { useState, useEffect } from "react";
import Chat from "components/chat/Chat";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (message) => {
    socket.emit("message", message);
  };

  return (
    <ChatLayout>
      <Chat messages={messages} onSendMessage={handleSendMessage} />
    </ChatLayout>
  );
};

export default ChatPage;
