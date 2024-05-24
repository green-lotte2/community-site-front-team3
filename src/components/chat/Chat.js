// src/components/chat/Chat.js
import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Link } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080/ws/chat");
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    return () => newSocket.close();
  }, []);

  const handleSendMessage = (text) => {
    const newMessage = { position: "right", text };
    setMessages([...messages, newMessage]);
    if (socket) {
      socket.send(JSON.stringify(newMessage));
    }
  };

  return (
    <div className="chat-layout-container">
      <div className="chat-container">
        <h2>Chat</h2>
        <div className="tabs">
          <Link to="#" className="active">
            Overview
          </Link>
          <Link to="#">Tasks</Link>
          <Link to="#">Documents</Link>
          <Link to="#">Team</Link>
          <Link to="#">Reports</Link>
          <Link to="#">Admin</Link>
        </div>
        <div className="messages-wrapper">
          <div className="messages">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                position={message.position}
                text={message.text}
              />
            ))}
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
