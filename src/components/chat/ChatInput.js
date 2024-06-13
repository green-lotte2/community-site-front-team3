import React, { useState } from "react";
import InviteFriends from "./InviteFriends";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const ChatInput = ({ onSendMessage, chatNo, uid, name, profile }) => {
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
        const response = await axios.post(`${url}/chat/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("파일 업로드 성공:", response.data);
        setFile(null);
        // 파일 업로드 후 서버에서 응답으로 새로운 메시지를 받아온 후 이를 전송
        onSendMessage(response.data.message, {
          message: file.name,
          sname: response.data.sName,
          oname: response.data.oName,
          profile: profile, // 프로필 추가
        });
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
