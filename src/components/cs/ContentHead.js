import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ContentHead = ({ handleCate }) => {
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
          <Button
            variant="outlined"
            stlye={linkStyle}
            to="#"
            class="on"
            value="service"
            onClick={handleCate}
          >
            결제/환불
          </Button>
        </li>
        <li style={liStyle}>
          <Button
            variant="outlined"
            stlye={linkStyle}
            to="#"
            class="on"
            value="service"
            onClick={handleCate}
          >
            이용문의
          </Button>
        </li>
        <li style={liStyle}>
          <Button
            variant="outlined"
            stlye={linkStyle}
            to="#"
            class="on"
            value="service"
            onClick={handleCate}
          >
            도용/보안
          </Button>
        </li>
        <li style={liStyle}>
          <Button
            variant="outlined"
            stlye={linkStyle}
            to="#"
            class="on"
            value="service"
            onClick={handleCate}
          >
            계정관리
          </Button>
        </li>
        <li style={liStyle}>
          <Button
            variant="outlined"
            stlye={linkStyle}
            to="#"
            class="on"
            value="service"
            onClick={handleCate}
          >
            계정관리
          </Button>
        </li>
      </ul>
    </article>
  );
};

export default ContentHead;
