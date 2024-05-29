import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Link } from "react-router-dom";

const Chat = ({ messages, onSendMessage, uid }) => {
  return (
    <div className="chat-layout-container">
      <div className="chat-container">
        <h2>Chat</h2>
        <div className="messages-wrapper">
          <div className="messages">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                position={message.uid === uid ? "right" : "left"}
                text={message.message}
              />
            ))}
          </div>
        </div>
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
