import React from 'react';
import { Link } from 'react-router-dom';
import 'styles/member/member.css';

const Login = () => {
    return (
        <>
            <div className="container">
                <div className="login-container">
                    <div className="login-options">
                        <div className="login-buttons">
                            <button className="kakao-login"></button>
                            <button className="google-login"></button>
                        </div>
                    </div>
                    <div className="login-form">
                        <form>
                            <label htmlFor="user-id">아이디</label>
                            <input type="text" id="user-id" name="user-id" placeholder="Enter your ID" />

                            <label htmlFor="password">비밀번호</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" />

                            <div className="additional-options">
                                <Link to="#">자동로그인</Link> |<Link to="#">아이디 찾기</Link> |
                                <Link to="#">비밀번호 찾기</Link>
                            </div>

                            <button type="submit">로그인</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
