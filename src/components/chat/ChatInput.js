import React, { useState } from "react";
import InviteFriends from "./InviteFriends";

const ChatInput = ({ onSendMessage, chatNo, company }) => {
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSendMessage}>
      <InviteFriends chatNo={chatNo} company={company} />
      <div className="input-and-button">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button type="submit">SEND</button>
      </div>
    </form>
  );
};

export default ChatInput;
