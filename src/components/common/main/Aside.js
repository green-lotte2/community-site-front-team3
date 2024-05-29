import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";
import { AiFillProject } from "react-icons/ai";
const Aside = () => {
  return (
    <>
      <aside>
        <ul>
          <li>
            <Link to="/project/board">
              <AiFillProject />
              프로젝트
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <FaCalendarAlt />
              캘린더
            </Link>
          </li>
          <li>
            <Link to="/page">
              <MdContactPage />
              페이지
            </Link>
          </li>
          <li>
            <Link to="/board/list">
              <FaClipboardList />
              게시판
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <IoChatboxEllipses />
              채팅
            </Link>
          </li>
          <li>
            <Link to="#">
              <RiCustomerServiceFill />
              고객센터
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Aside;
