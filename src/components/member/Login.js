import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '../styles/CustomButton';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from 'slices/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        uid: '',
        pass: '',
    });

    const submitHandler = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8080/user/login', user)
            .then((resp) => {
                console.log(resp.data);

                // 리덕스 액션 실행
                dispatch(login(resp.data));

                // 메인 전환
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const changeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="container">
                <div className="login-container">
                    <div className="login-form">
                        <form onSubmit={submitHandler} className="login-form-submit">
                            <label htmlFor="uid">아이디</label>
                            <input
                                type="text"
                                name="uid"
                                placeholder="Enter your ID"
                                value={user.uid}
                                onChange={changeHandler}
                                required
                            />

                            <label htmlFor="pass">비밀번호</label>
                            <input
                                type="pass"
                                name="pass"
                                placeholder="Enter your password"
                                value={user.pass}
                                onChange={changeHandler}
                                required
                            />

                            <div className="additional-options">
                                <Link to="#">자동로그인</Link> |<Link to="#">아이디 찾기</Link> |
                                <Link to="#">비밀번호 찾기</Link>
                            </div>

                            <CustomButton type="submit">로그인</CustomButton>

                            <div className="login-buttons">
                                <button className="kakao-login"></button>
                                <button className="google-login"></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
