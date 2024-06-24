import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList, FaHome } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";
import { AiFillProject } from "react-icons/ai";
import { globalPath } from "globalPaths";
import axios from "axios";
import { useSelector } from "react-redux";

const Aside = ({ titleStat, setPageState }) => {
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
      console.log("uid : " + uid);
      const response = await axios.get(`${path}/pages?uid=${uid}`);
      console.log(response.data);
      setPages(response.data);
      setCountPage(response.data.length); // 수정: response.data.length로 변경
    };
    fetchData();
  }, [countPage, titleStat]);

  /** 페이지 생성 */
  const handleAddPage = async () => {
    // 페이지 생성 제한 조건 추가
    if (authSlice.grade === "FREE" && countPage >= 3) {
      alert("FREE 등급은 페이지를 3개까지만 이용할 수 있습니다.");
      return;
    }
    if (authSlice.grade !== "MVP" && countPage >= 4) {
      alert("MVP 등급이 아닌 경우 페이지를 3개까지만 이용할 수 있습니다.");
      return;
    }

    const resp = await axios.post(`${path}/page`, {
      uid: uid,
      title: "untitled",
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
            <div className="logo">
              <Link to={globalPath.mainPath}>
                <img
                  src="/images/logo/logo13.png"
                  alt="aa"
                  style={{ width: "140px" }}
                />
              </Link>
            </div>
          </li>
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
                    <Link
                      to={`/page/${page.pageNo}`}
                      key={index}
                      onClick={() => setPageState && setPageState(true)} // setPageState 호출 수정
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
                <div className="plusPage">
                  <span className="addPage" onClick={handleAddPage}>페이지 추가</span>
                  <button
                    onClick={handleAddPage}
                    className="btnPagePlus"
                    style={{ margin: "0 0 0 6px" }}
                  >
                    +
                  </button>
                </div>
              </>
            )}
          </li>
          <li>
            <Link to="/article/list">
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
