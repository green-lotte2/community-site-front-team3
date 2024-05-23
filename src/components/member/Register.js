import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        uid: '',
        pass: '',
        pass2: '',
        name: '',
        nick: '',
        email: '',
        hp: '',
        grade: 'BASIC',
        role: 'USER',
    });

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(user);

        if (user.pass !== user.pass2) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        axios
            .post('http://localhost:8080/user', user)
            .then((response) => {
                console.log(response.data);
                alert('회원가입 완료!');

                navigate('/user/login');
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
                <div className="signup-container">
                    <div className="signup-Form">
                        <form onSubmit={submitHandler}>
                            <label htmlFor="uid">아이디</label>
                            <input
                                type="text"
                                name="uid"
                                placeholder="Enter your ID"
                                onChange={changeHandler}
                                value={user.uid}
                            />

                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                name="pass"
                                placeholder="Enter your PW"
                                value={user.pass}
                                onChange={changeHandler}
                            />

                            <label htmlFor="confirm-password">비밀번호 확인</label>
                            <input type="password" name="pass2" placeholder="Check your PW" onChange={changeHandler} />

                            <label htmlFor="name">이름</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={user.name}
                                onChange={changeHandler}
                            />

                            <label htmlFor="nick">별명</label>
                            <input
                                type="text"
                                name="nick"
                                placeholder="Enter your nick"
                                value={user.nick}
                                onChange={changeHandler}
                            />

                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={changeHandler}
                            />
                            <button className="email-verify" type="button">
                                이메일 인증
                            </button>

                            <label htmlFor="hp">휴대폰번호</label>
                            <input
                                type="text"
                                name="hp"
                                placeholder="Enter your HP"
                                value={user.hp}
                                onChange={changeHandler}
                            />

                            <button type="submit">회원가입</button>
                        </form>
                        <div className="signup-options">
                            <div className="signup-buttons">
                                <button className="kakao-signup">카카오</button>
                                <button className="google-signup">구글</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
