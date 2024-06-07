import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { format, isSameDay, parseISO } from "date-fns";

const Chat = ({ messages, onSendMessage, uid, roomTitle, chatNo, name }) => {
  console.log(messages);

  const renderMessages = () => {
    let lastDate = null;

    return messages.map((message, index) => {
      let currentDate = new Date();

      try {
        currentDate = parseISO(message.cDate);
      } catch (error) {
        console.error("Invalid date format:", message.cDate);
      }

      const showDate = !lastDate || !isSameDay(lastDate, currentDate);
      lastDate = currentDate;

      return (
        <React.Fragment key={index}>
          {showDate && (
            <div className="date-divider">
              {format(currentDate, "yyyy-MM-dd")}
            </div>
          )}
          <ChatMessage
            key={index}
            position={message.uid === uid ? "right" : "left"} // 메시지 위치 설정
            text={message.message}
            name={name}
            date={format(currentDate, "HH:mm")}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="chat-layout-container">
      <div className="chat-container">
        <h2>{roomTitle}</h2> {/* 채팅방 제목 표시 */}
        <div className="messages-wrapper">
          <div className="messages">{renderMessages()}</div>
        </div>
        <ChatInput
          onSendMessage={onSendMessage}
          chatNo={chatNo}
          uid={uid}
          name={name}
        />
      </div>
    </div>
  );
};

export default Chat;
