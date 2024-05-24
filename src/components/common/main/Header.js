import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const authSlice = useSelector((state) => state.authSlice);

    const logoutHandler = () => {
        // 리덕스 로그아웃 액션 실행
        dispatch(logout());
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
                                {!authSlice.username ? (
                                    <>
                                        <li>
                                            <Link to="/member/login">로그인</Link>
                                        </li>
                                        <li>
                                            <Link to="/member/terms">회원가입</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
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
                </div>
            </header>
        </>
    );
};

export default Header;
