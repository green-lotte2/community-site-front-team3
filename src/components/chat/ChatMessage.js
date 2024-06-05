import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const ChatMessage = ({ position, text, name }) => {
  console.log("name" + name);
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
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
