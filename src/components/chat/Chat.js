import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { format, isSameDay, parseISO } from "date-fns";

const Chat = ({ messages, onSendMessage, uid, roomTitle, chatNo, name }) => {
  console.log("111", messages);

  // 서버 응답 데이터 확인
  useEffect(() => {
    messages.forEach((message, index) => {
      console.log(`Message ${index}:`, message);
    });
  }, [messages]);

  const renderMessages = () => {
    let lastDate = null;

    return messages.map((message, index) => {
      let currentDate;

      try {
        currentDate = parseISO(message.cDate);
        console.log("Parsed Date:", currentDate); // 파싱된 날짜 확인
      } catch (error) {
        console.error("Invalid date format:", message.cDate);
        currentDate = new Date();
      }

      const showDate = !lastDate || !isSameDay(lastDate, currentDate);
      lastDate = currentDate;

      console.log("Message to be rendered:", message); // 메시지 데이터 확인

      return (
        <React.Fragment key={index}>
          {showDate && (
            <div className="date-divider">
              {format(currentDate, "yyyy-MM-dd")}
            </div>
          )}
          <ChatMessage
            key={index}
            position={message.uid === uid ? "right" : "left"}
            text={message.message}
            name={message.name}
            date={format(currentDate, "HH:mm")}
            sName={message.sname}
            oName={message.oname}
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
