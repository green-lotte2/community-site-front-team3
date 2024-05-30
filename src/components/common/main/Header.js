import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'slices/authSlice';
import { globalPath } from 'globalPaths';
import axios from 'axios';

const Header = () => {
    const url = globalPath.path;
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dispatch = useDispatch();
    const authSlice = useSelector((state) => state.authSlice);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        // 리덕스 로그아웃 액션 실행
        await dispatch(logout());
        alert('로그아웃 되었습니다.');
        navigate(`/`);
    };
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const getUserInfo = async () => {

        const response = await axios.get(`/user/info?uid=${authSlice.uid}`);
        navigate(`/member/profile?uid=${authSlice.uid}`, { state: { user: response.data } });
       

    }

    return (
        <>
            <header>
                <div class="container">
                    <div class="logo">
                        <Link to= {globalPath.mainPath}>
                            <img src="/images/logo/logo6.png" alt="aa" style={{ width: '120px' }} />
                        </Link>
                    </div>
                    <div class="nav-search">
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
                                            <img 
                                                src="/images/icon/user.png"
                                                alt="Profile" 
                                                className="profile-picture"
                                            />
                                            {isDropdownVisible && (
                                                <div className="jnd-dropdown-menu gnb-profile-dropdown right">
                                                    <h5 className="jnd-option-title">
                                                        <span className="jnd-option-txt">
                                                            <span className="ng-scope">프로필</span>
                                                        </span>
                                                    </h5>
                                                    <ul className="jnd-option-list">
                                                        <li tabIndex="0" className="jnd-option-item" onClick={getUserInfo}>
                                                            <i className="jnd-option-icon icon-pencil" aria-hidden="true"></i>
                                                            <span className="jnd-option-txt">
                                                                <span className="ng-scope">계정 설정</span>
                                                            </span>
                                                        </li>
                                                        <li tabIndex="0" className="jnd-option-item" onClick={logoutHandler}>
                                                            <i className="jnd-option-icon icon-sign-out" aria-hidden="true"></i>
                                                            <span className="jnd-option-txt">
                                                                <span className="ng-scope">로그아웃</span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                        <li>
                                            <div className="welcome-user">{authSlice.name}님 반갑습니다</div>
                                        </li>
                                        <li>
                                            <Link to="#">관리자</Link>
                                        </li>
                                    </>
                                )}

                                <li>
                                    <Link to="#">고객센터</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar"></div>
                    </div>
                    <div className="action-buttons">
                        <button className="learn-more">1:1 문의하기</button>
                        <button className="join-now">요금제 가입</button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
