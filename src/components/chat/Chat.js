import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage"; // 이름 확인
import ChatInput from "./ChatInput";
import { format, isSameDay, parseISO } from "date-fns";

const Chat = ({ messages, onSendMessage, uid, roomTitle, chatNo, name }) => {
  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  const updateMessages = (newMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const renderMessages = () => {
    let lastDate = null;

    return chatMessages.map((message, index) => {
      let currentDate;

      try {
        currentDate = parseISO(message.cDate);
        console.log("Parsed Date:", currentDate);
      } catch (error) {
        currentDate = new Date();
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
            position={message.uid === uid ? "right" : "left"}
            text={message.message}
            name={message.name}
            date={format(currentDate, "HH:mm")}
            sName={message.sName} // Note the case here
            oName={message.oName} // Note the case here
            profile={message.profile}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="chat-layout-container">
      <div className="chat-container">
        <h2>{roomTitle}</h2>
        <div className="messages-wrapper">
          <div className="messages">{renderMessages()}</div>
        </div>
        <ChatInput
          onSendMessage={onSendMessage}
          chatNo={chatNo}
          uid={uid}
          name={name}
          updateMessages={updateMessages} // 추가
        />
      </div>
    </div>
  );
};

export default Chat;
