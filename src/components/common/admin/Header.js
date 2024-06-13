import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { globalPath } from 'globalPaths';
import { logout } from 'slices/authSlice';
import axios from 'axios';

const Header = () => {
    const url = globalPath.path;
    const authSlice = useSelector((state) => state.authSlice);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const confrimed = window.confirm('로그아웃 하시겠습니까?');
        if (confrimed) {
            await dispatch(logout());
            localStorage.removeItem('token');
            alert('로그아웃 되었습니다.');
            navigate(`/`);
        }
    };
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    /** 계정 설정 - 사용자 정보 넘겨줌 */
    const getUserInfo = async () => {
        const response = await axios.get(`${url}/user/info?uid=${authSlice.uid}`);
        navigate(`/member/passcheck?uid=${authSlice.uid}`, { state: { user: response.data } });
    };

    const [user, setUser] = useState({
        uid: '',
        profile: '',
        grade: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/user/info?uid=${authSlice.uid}`);

                setUser({ uid: response.data.uid, profile: response.data.profile, grade: response.data.grade });
            } catch (error) {
                console.error('사용자 정보 받기 에러:', error);
            }
        };
        if (authSlice.uid) {
            fetchUserData();
        }
    }, [url]);
    return (
        <>
            <header className="aHeader">
                <div className="aContainer">
                    <Link to="/">
                        <img src="/images/logo/logo13.png" alt="aa" style={{ width: '120px' }} />
                    </Link>
                    <div className="aLogo">
                        <h1>관리자 페이지</h1>
                    </div>
                    <div className="aNav-search">
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
                                        <li className="admin-welcome-section" onClick={toggleDropdown}>
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
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                        <li>
                                            <div className="admin-welcome-user">{authSlice.name}님, 반갑습니다.</div>
                                        </li>
                                    </>
                                )}
                                {user.grade === 'FREE' && (
                                    <li>
                                        <Link to="/member/subscribe">요금제가입</Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                        <div className="search">
                            <input type="text" placeholder="Search in site" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
