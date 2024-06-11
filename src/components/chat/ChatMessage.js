import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { globalPath } from "globalPaths";
import axios from "axios";

const ChatMessage = ({ position, text, name, date, sName, oName }) => {
  const url = globalPath.path;

  const handlerdownload = async (e, sName, oName) => {
    e.preventDefault();
    axios
      .get(`${url}/chat/download/${sName}`, {
        responseType: "blob",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <Link
            to={`/chat/download/${sName}`}
            onClick={(e) => handlerdownload(e, sName, oName)}
          >
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
