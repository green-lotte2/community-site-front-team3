import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { format, isSameDay, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const Chat = ({
  messages,
  onSendMessage,
  uid,
  roomTitle,
  chatNo,
  name,
  profile,
}) => {
  useEffect(() => {
    console.log("Messages updated");
  }, [messages]);

  const renderMessages = () => {
    let lastDate = null;

    return messages.map((message, index) => {
      let currentDate;

      try {
        const utcDate = parseISO(message.cDate);
        currentDate = toZonedTime(utcDate, "Asia/Seoul");
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
            sName={message.sname}
            oName={message.oname}
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
          profile={profile}
        />
      </div>
    </div>
  );
};

export default Chat;
