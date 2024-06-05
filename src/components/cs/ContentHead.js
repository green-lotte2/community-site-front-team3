import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { globalPath } from "globalPaths";
import axios from "axios";

const ContentHead = ({ value, setValue }) => {
  const [cate, setCate] = useState([]);

  const url = globalPath.path;

  /** 카테고리 리스트 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/csCate`)
      .then((response) => {
        setCate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /** 클릭시 카테 저장 */
  const handlerClick = (e) => {
    setValue(e.target.value);
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
    width: "1500px",
  };

  const liStyle = {
    marginRight: "40px",
    fontSize: "16px",
  };

  const linkStyle = { color: "#111", border: "0px solid #111" };

  return (
    <article style={articleStyle}>
      <ul className="sort" style={sortStyle}>
        {cate.map((category, index) => (
          <li style={liStyle} key={index}>
            <Button
              variant="outlined"
              style={linkStyle}
              className="on"
              value={category}
              onClick={handlerClick}
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ContentHead;
