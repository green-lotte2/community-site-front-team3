import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "slices/authSlice";
import { globalPath } from "globalPaths";
import axios from "axios";
import CsModal from "components/main/CsModal";

const Header = () => {
  const url = globalPath.path;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false); // 모달 오픈 상태
  const [myAnswer, setMyAnswer] = useState([]); // 가져온 문의 관리 State
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const uid = authSlice.uid;

  const [user, setUser] = useState({
    uid: "",
    profile: "",
    grade: "",
  });

  const logoutHandler = async () => {
    const confirmed = window.confirm("로그아웃을 하시겠습니까?");
    if (confirmed) {
      await dispatch(logout());
      localStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      navigate(`/`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const getUserInfo = async () => {
    const response = await axios.get(`${url}/user/info?uid=${authSlice.uid}`);
    navigate(`/member/passcheck?uid=${authSlice.uid}`, {
      state: { user: response.data },
    });
  };

  /**모달 오픈 핸들러*/
  const handleOpen = () => {
    setOpen(true);
    const fetchData = async () => {
      await axios
        .get(`${url}/question/selectMy?uid=${uid}`)
        .then((response) => {
          setMyAnswer(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  };
  const handleClose = () => setOpen(false); // 모달 클로즈 핸들러

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${url}/user/info?uid=${authSlice.uid}`
        );

        setUser({
          uid: response.data.uid,
          profile: response.data.profile,
          grade: response.data.grade,
        });
      } catch (error) {
        console.error("사용자 정보 받기 에러:", error);
      }
    };
    if (authSlice.uid) {
      fetchUserData();
    }
  }, [url, authSlice.uid]);

  return (
    <>
      <header className="mainHeader">
        <div className="container">
          <div id="main-nav-search" className="nav-search">
            <nav>
              <ul>
                {!authSlice.uid ? (
                  <>
                    <li>
                      <Link to="/">로그인</Link>
                    </li>
                    <li>
                      <Link to="/member/terms">회원가입</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="welcome-section" onClick={toggleDropdown}>
                      {authSlice.profile ? (
                        <img
                          src={`${globalPath.path}/prodImg/${user.profile}`}
                          alt="Profile"
                          className="profile-picture"
                        />
                      ) : (
                        <img
                          src="/images/icon/user.png"
                          alt="Profile"
                          className="profile-picture"
                        />
                      )}
                      {isDropdownVisible && (
                        <div className="jnd-dropdown-menu gnb-profile-dropdown right">
                          <h5 className="jnd-option-title">
                            <span className="jnd-option-txt">
                              <span className="ng-scope">프로필</span>
                            </span>
                          </h5>
                          <ul className="jnd-option-list">
                            <li
                              tabIndex="0"
                              className="jnd-option-item"
                              onClick={getUserInfo}
                            >
                              <i
                                className="jnd-option-icon icon-pencil"
                                aria-hidden="true"
                              ></i>
                              <span className="jnd-option-txt">
                                <span className="ng-scope">계정 설정</span>
                              </span>
                            </li>
                            <li
                              tabIndex="0"
                              className="jnd-option-item"
                              onClick={logoutHandler}
                            >
                              <i
                                className="jnd-option-icon icon-sign-out"
                                aria-hidden="true"
                              ></i>
                              <span className="jnd-option-txt">
                                <span className="ng-scope">로그아웃</span>
                              </span>
                            </li>
                            <li
                              tabIndex="0"
                              className="jnd-option-item"
                              onClick={handleOpen} // 모달 오픈 함수
                            >
                              <i
                                className="jnd-option-icon icon-pencil"
                                aria-hidden="true"
                              ></i>
                              <span className="jnd-option-txt">
                                <span className="ng-scope">내 문의</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li>
                      <div className="welcome-user" onClick={toggleDropdown}>
                        {authSlice.name}님, 반갑습니다.
                      </div>
                    </li>
                    <li>
                      <Link to="/admin">관리자</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/cs">고객센터</Link>
                </li>
                <li>
                  <Link to="/member/subscribe">요금제가입</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <CsModal open={open} handleClose={handleClose} myAnswer={myAnswer} />
      </header>
    </>
  );
};

export default Header;
