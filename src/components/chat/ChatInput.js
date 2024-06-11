import React, { useState } from "react";
import InviteFriends from "./InviteFriends";
import axios from "axios";

const ChatInput = ({ onSendMessage, chatNo, uid, name }) => {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      onSendMessage(inputText, null);
      setInputText("");
    }
  };

  const handleSendFile = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chatNo", chatNo);
      formData.append("uid", uid);

      try {
        const response = await axios.post("/chat/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("파일 업로드 성공:", response.data);
        setFile(null);
      } catch (error) {
        console.error(
          "파일 업로드 실패:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      <form onSubmit={handleSendFile}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">UPLOAD</button>
      </form>
    </div>
  );
};

export default ChatInput;
