import React from 'react';
import 'styles/member/member.css';

const Register = () => {
    return (
        <>
            <div class="container">
                <div class="signup-container">
                    <div class="signup-Form">
                        <form>
                            <label htmlhtmlFor="user-id">아이디</label>
                            <input type="text" id="user-id" name="user-id" placeholder="Enter your ID" />

                            <label htmlhtmlFor="password">비밀번호</label>
                            <input type="password" id="password" name="password" placeholder="Enter your PW" />

                            <label htmlhtmlFor="confirm-password">비밀번호 확인</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Check your PW"
                            />

                            <label htmlhtmlFor="name">이름</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" />

                            <label htmlhtmlFor="email">이메일</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" />
                            <button class="email-verify" type="button">
                                이메일 인증
                            </button>

                            <label htmlhtmlFor="phone">휴대폰번호</label>
                            <input type="text" id="phone" name="phone" placeholder="Enter your HP" />

                            <button type="submit">회원가입</button>
                        </form>
                        <div class="signup-options">
                            <div class="signup-buttons">
                                <button class="kakao-signup">카카오</button>
                                <button class="google-signup">구글</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
