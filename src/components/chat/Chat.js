import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const Chat = ({ messages, onSendMessage, uid, roomTitle }) => {
  console.log("@@@@@");
  console.log(messages);

    // messages가 배열인지 확인하고, 배열이 아닌 경우 빈 배열로 설정
    const validMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="chat-layout-container">
      <div className="chat-container">
        <h2>{roomTitle}</h2> {/* 채팅방 제목 표시 */}
        <div className="messages-wrapper">
          <div className="messages">
          {validMessages.length === 0 ? (
        <div>메세지 없음</div> // messages 배열이 비었을 때 표시할 내용
    ) : (
      validMessages.map((message, index) => (
            <ChatMessage
                key={index}
                position={message.uid === uid ? "right" : "left"} // 메시지 위치 설정
                text={message.message}
            />
        ))
    )}
          </div>
        </div>
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
