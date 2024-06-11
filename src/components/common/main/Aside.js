import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";
import { AiFillProject } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { globalPath } from "globalPaths";
import axios from "axios";
import { useSelector } from "react-redux";

const Aside = ({titleStat}) => {
  const dynamicPath = "/project/list";
  const path = globalPath.path;
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.uid;
  
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const [countPage, setCountPage] = useState(0);

  /** 페이지 클릭하면 열림 */
  const togglePageMenu = (e) => {
    e.preventDefault();
    setIsPageOpen(!isPageOpen);
  };

  useEffect(() => {
    /** 페이지 조회 */
    const fetchData = async () => {
        console.log("uid : "+ uid)
      const response = await axios.get(`${path}/pages?uid=${uid}`);
      console.log(response.data);
      setPages(response.data);
      setCountPage(response.length);
    };
    fetchData();
  }, [countPage,titleStat]);

  /** 페이지 생성 */
  const handleAddPage = async () => {
    const resp = await axios.post(`${path}/page`, {
      uid : uid,
      title : "untitled",
    });
    const pageNo = resp.data;
    console.log("페이지 생성 번호 : ", pageNo);
    setCountPage(countPage + 1);
  };

  return (
    <>
      <aside>
        <ul>
          <li>
            <Link to="/main">
              <FaHome size={20} color="#009425" />
              Home
            </Link>
          </li>
          <li>
            <Link to={dynamicPath}>
              <AiFillProject size={20} color="#ff8916" />
              프로젝트
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <FaCalendarAlt size={20} color="#009425" />
              캘린더
            </Link>
          </li>
          <li>
            <Link
              onClick={togglePageMenu}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdContactPage size={20} color="#ff8916" />
              페이지
            </Link>
            {isPageOpen && (
                <>
              <div>
                {pages.map((page, index) => (
                    <Link to={`/page/${page.pageNo}`} key={index}>{page.title}</Link>
                ))}
              </div>
              <div>
              <span className="addPage">페이지 추가</span>
              <button onClick={handleAddPage} className="btnPagePlus">+</button>
              </div>
              </>
            )}
          </li>
          <li>
            <Link to="/board/list">
              <FaClipboardList size={20} color="#009425" />
              게시판
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <IoChatboxEllipses size={20} color="#ff8916" />
              채팅
            </Link>
          </li>
          <li>
            <Link to="/cs">
              <RiCustomerServiceFill size={20} color="#009425" />
              고객센터
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Aside;
