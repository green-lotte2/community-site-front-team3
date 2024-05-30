import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'slices/authSlice';
import { globalPath } from 'globalPaths';

const Header = () => {
    const dispatch = useDispatch();
    const authSlice = useSelector((state) => state.authSlice);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        // 리덕스 로그아웃 액션 실행
        await dispatch(logout());
        alert('로그아웃 되었습니다.');
        navigate(`${globalPath.loginPath}`);
    };
    return (
        <>
            <header>
                <div class="container">
                    <div class="logo">
                        <Link to="/">
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
                                        <li>
                                            <div className="welcome-user">{authSlice.name}님 반갑습니다</div>
                                        </li>
                                        <li>
                                            <Link to="/member/logout/" onClick={logoutHandler}>
                                                로그아웃
                                            </Link>
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
