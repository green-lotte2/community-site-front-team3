import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const Chat = ({ messages, onSendMessage, uid, roomTitle }) => {
  // 범인 아님
  return (
    <div className="chat-layout-container">
      <div className="chat-container">
        <h2>{roomTitle}</h2> {/* 채팅방 제목 표시 */}
        <div className="messages-wrapper">
          <div className="messages">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                position={message.uid === uid ? "right" : "left"} // 메시지 위치 설정
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
