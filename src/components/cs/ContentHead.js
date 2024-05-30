import React, { useState } from "react";
import Button from "@mui/material/Button";
import { LuMailQuestion } from "react-icons/lu";
import { Link } from "react-router-dom";
import { RiFontSize } from "react-icons/ri";

const ContentHead = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    return setAge(event.target.value);
  };
  const articleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

 

  const sortStyle = {
    paddingTop: "15px",
    paddingBottom: "15px",
    borderTop: "2px solid #111",
    borderBottom: "2px solid #111",
    listStyle: "none",
    display: "flex",
    width: "1200px",
  };

  const liStyle = {
    marginRight: "40px",
    fontSize: "16px",
  };

  const linkStyle = {};

  return (
    <article style={articleStyle}>
      <ul className="sort" style={sortStyle}>
        <li style={liStyle}>
          <Link stlye={linkStyle} to="#" class="on">
            결제/서비스
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="#" class="on">
            이용문의
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="#" class="on">
            으아어어아
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="#" class="on">
            뭐있지이
          </Link>
        </li>
      </ul>
    </article>
  );
};

export default ContentHead;
