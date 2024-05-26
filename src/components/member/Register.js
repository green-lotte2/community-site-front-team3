import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import CSS file for styling
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        uid: '',
        pass: '',
        pass2: '',
        name: '',
        nick: 'NULL',
        email: '',
        hp: 'NULL',
        grade: 'BASIC',
        role: 'USER',
        verificationCode: '',
    });
    const [errors, setErrors] = useState({
        uid: '',
        pass: '',
        pass2: '',
        name: '',
        email: '',
        verificationCode: '',
    });
    const [showVerification, setShowVerification] = useState(false); // State to control visibility of verification code input
    const handleBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';
        switch (name) {
            case 'uid':
                const uidPattern = /^[a-zA-Z0-9_]{4,20}$/;
                errorMessage = !uidPattern.test(value) ? '아이디는 영문자와 숫자로 4자 이상, 20자 이하여야 합니다.' : '';
                break;
            case 'pass':
                const passPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
                errorMessage = !passPattern.test(value) ? '비밀번호는 영문자와 숫자를 포함하여 8자 이상이어야 합니다.' : '';
                break;
            case 'pass2':
                errorMessage = user.pass !== value ? '비밀번호와 비밀번호 확인이 일치하지 않습니다.' : '';
                break;
            case 'name':
                errorMessage = !value ? '이름은 필수입력 사항입니다.' : '';
                break;
            case 'email':
                const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                errorMessage = !emailPattern.test(value) ? '올바른 이메일 주소를 입력해주세요.' : '';
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };
    const submitHandler = (e) => {
        e.preventDefault();
        // Check for any remaining errors
        for (const error in errors) {
            if (errors[error]) {
                alert('양식을 올바르게 작성해주세요.');
                return;
            }
        }
        registerUser();
    };
    const registerUser = () => {
        axios
            .post('http://localhost:8080/user', user)
            .then((response) => {
                console.log(response.data);
                alert('회원가입 완료!');
                navigate('/member/login');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const changeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        // Clear the error message when user starts typing again
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };
    const handleEmailVerification = () => {
        // Make an API call to your backend to send the email verification code
        axios
            .get(`http://localhost:8080/member/checkUser/email/${user.email}`)
            .then((response) => {
                console.log(response.data);
                //alert('인증코드가 이메일로 전송되었습니다.');
                setShowVerification(true); // Show the verification code input field
            })
            .catch((err) => {
                console.log(err);
                // Handle error, such as displaying an error message to the user
                //alert('인증코드 전송에 실패했습니다. 다시 시도해주세요.');
            });
    };
    const checkEmailCode = () => {
        axios
            .get(`http://localhost:8080/member/checkEmailCode/${user.verificationCode}`)
            .then((response) => {
                const data = response.data;
                if (data.result === 0) {
                    console.log(user.verificationCode);
                    //alert('인증코드가 일치합니다.');
                } else {
                    console.log(user.verificationCode);
                    //alert('인증코드가 일치하지 않습니다.');
                }
            })
            .catch((error) => {
                console.log(user.verificationCode);
                console.error('인증코드 확인에 실패하였습니다.', error);
                //alert('인증코드 확인에 실패했습니다.');
            });
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
                                onBlur={handleBlur}
                                onChange={changeHandler}
                                value={user.uid}
                            />
                            <span className="error-message">{errors.uid}</span>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                name="pass"
                                placeholder="Enter your PW"
                                onBlur={handleBlur}
                                onChange={changeHandler}
                                value={user.pass}
                            />
                            <span className="error-message">{errors.pass}</span>
                            <label htmlFor="confirm-password">비밀번호 확인</label>
                            <input
                                type="password"
                                name="pass2"
                                placeholder="Check your PW"
                                onBlur={handleBlur}
                                onChange={changeHandler}
                            />
                            <span className="error-message">{errors.pass2}</span>
                            <label htmlFor="name">이름</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                onBlur={handleBlur}
                                onChange={changeHandler}
                                value={user.name}
                            />
                            <span className="error-message">{errors.name}</span>
                            <label htmlFor="email">이메일</label>
                            <div className="email-input-container">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onBlur={handleBlur}
                                    onChange={changeHandler}
                                    value={user.email}
                                />
                                <span className="error-message">{errors.email}</span>
                                {/* Button to trigger email verification */}
                                <button className="email-verify" type="button" onClick={handleEmailVerification}>
                                    이메일 인증
                                </button>
                            </div>
                            {/* Conditionally render verification code input */}
                            {showVerification && (
                                <div className="verification-code-container">
                                    <input
                                        type="text"
                                        name="verificationCode"
                                        placeholder="인증코드를 입력하세요."
                                        onBlur={handleBlur}
                                        onChange={changeHandler}
                                        value={user.verificationCode}
                                    />
                                    {/* Button to confirm verification code */}
                                    <button className="email-verify" type="button" onClick={checkEmailCode}>
                                        인증코드 확인
                                    </button>
                                </div>
                            )}
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