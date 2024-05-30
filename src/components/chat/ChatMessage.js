import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";

const ChatMessage = ({ position, text }) => {
  return (
    <div className={`chat-message ${position}`}>
      <div className="chat-user">
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="凸"
          src="/static/images/avatar/1.jpg"
        />
      </div>
      <div className="chat-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
