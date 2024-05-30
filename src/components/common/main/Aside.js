import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";
import { AiFillProject } from "react-icons/ai";

const Aside = () => {
  const dynamicPath = '/project/list';
  return (
    <>
      <aside>
        <ul>
          <li>
            <Link to={dynamicPath}>
              <AiFillProject size={20}/>
              프로젝트
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <FaCalendarAlt size={20}/>
              캘린더
            </Link>
          </li>
          <li>
            <Link to="/page">
              <MdContactPage size={20}/>
              페이지
            </Link>
          </li>
          <li>
            <Link to="/board/list">
              <FaClipboardList size={20}/>
              게시판
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <IoChatboxEllipses size={20}/>
              채팅
            </Link>
          </li>
          <li>
            <Link to="#">
              <RiCustomerServiceFill size={20}/>
              고객센터
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Aside;
