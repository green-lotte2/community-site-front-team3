import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Link } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/messages")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSendMessage = (text) => {
    const newMessage = { position: "right", text };
    setMessages([...messages, newMessage]);

    axios
      .post("/api/messages", newMessage)
      .then((response) => {
        console.log("Message sent successfully:", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
