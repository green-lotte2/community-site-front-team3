import React, { useState } from "react";
import InviteFriends from "./InviteFriends";

const ChatInput = ({ onSendMessage, chatNo }) => {
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <div className="chat-input">
      <InviteFriends chatNo={chatNo} />
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default ChatInput;
