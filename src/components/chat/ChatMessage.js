import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { globalPath } from "globalPaths";
import axios from "axios";

const ChatMessage = ({ position, text, name, date, sName, oName, profile }) => {
  const url = globalPath.path;

  const handlerdownload = async (e, sName, oName) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${url}/chat/download/${sName}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = oName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.log(err);
    }
  };

  const profileImage = profile
    ? `${url}/prodImg/${profile}`
    : `${url}/prodImg/BBang2.png`;

  // 이미지 파일 확장자 확인 함수
  const isImageFile = (filename) => {
    return filename.match(/\.(jpeg|jpg|gif|png|bmp)$/i);
  };

  return (
    <div className={`chat-message ${position}`}>
      <div className="chat-user">
        <span className="chat-username">{name}</span>
        <Avatar sx={{ bgcolor: deepOrange[400] }} src={profileImage} />
      </div>
      <div className="chat-text">
        {sName && isImageFile(oName) ? (
          <Link to="#" onClick={(e) => handlerdownload(e, sName, oName)}>
            {oName}
          </Link>
        ) : (
          <p>{text}</p>
        )}
      </div>
      <div className={`chat-date ${position}`}>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
