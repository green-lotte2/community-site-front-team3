import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const CheckPass = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // user 상태 설정
    const [user, setUser] = useState({
        uid: '',
        pass: '',
    });

    const submitHandler = () => {};

    // 정보 변경 핸들러
    const changeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="profile-update-container">
                <div className="profile-update-form">
                    <form onSubmit={submitHandler}>
                        <input type="hidden" name="uid" placeholder="아이디를 입력하세요." value={user.uid} />
                        <label htmlFor="pass">비밀번호 확인</label>
                        <input
                            type="password"
                            name="pass"
                            placeholder="비밀번호를 입력하세요."
                            onChange={changeHandler}
                            value={user.pass}
                        />
                        <button type="submit">확인</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckPass;
