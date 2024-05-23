import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <>
      <aside>
        <ul>
          <li>
            <Link to="/project/board">프로젝트</Link>
          </li>
          <li>
            <Link to="/calendar">캘린더</Link>
          </li>
          <li>
            <Link to="/newPage">페이지</Link>
          </li>
          <li>
            <Link to="/board/list">게시판</Link>
          </li>
          <li>
            <Link to="/chat">채팅</Link>
          </li>
          <li>
            <Link to="#">고객센터</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Aside;
