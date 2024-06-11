import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const ChatMessage = ({ position, text, name, date, sName }) => {
  return (
    <div className={`chat-message ${position}`}>
      <div className="chat-user">
        <span className="chat-username">{name}</span>
        <Avatar
          sx={{ bgcolor: deepOrange[400] }}
          src="../../images/icon/BigOrage.jpg"
        />
      </div>
      <div className="chat-text">
        {sName ? (
          <a href={`/uploads/${sName}`} download>
            {text}
          </a>
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
