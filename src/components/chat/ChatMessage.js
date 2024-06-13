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

  return (
    <div className={`chat-message ${position}`}>
      <div className="chat-user">
        <span className="chat-username">{name}</span>
        <Avatar
          sx={{ bgcolor: deepOrange[400] }}
          src={
            profile ? `${url}/prodImg/${profile}` : `${url}/prodImg/BBang2.png`
          }
        />
      </div>
      <div className="chat-text">
        {sName ? (
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

export default ChatMessage; // default export
