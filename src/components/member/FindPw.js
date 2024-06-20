import axios from 'axios';
import React, { useState } from 'react';
import { SEND_FINDID_EMAIL_CODE_PATH, CHECK_EMAIL_CODE_PATH, CHANGEPASS_PATH } from 'requestPath';
import { Link, useNavigate } from 'react-router-dom';

const FindPw = () => {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [showVerificationCode, setShowVerificationCode] = useState(false);
    const [showPassChange, setShowPassChange] = useState(false);
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
    const navigate = useNavigate();
    const [serverCode, setServerCode] = useState('');

    // 비밀번호 찾기 이메일 인증코드 전송
    const handleRequestCode = async () => {
        try {
            const response = await axios.post(SEND_FINDID_EMAIL_CODE_PATH, { email }, { withCredentials: true });
            if (response.status === 200) {
                setShowVerificationCode(true);
                setVerificationSent(true);
                setServerCode(response.data.code); // Save the encrypted code from the server
                alert('인증코드가 이메일로 전송되었습니다.');
            } else {
                alert('전송 실패.');
            }
        } catch (error) {
            alert('이메일 주소가 틀렸습니다.');
        }
    };

    // 비밀번호 찾기 이메일 중복 및 인증코드 확인
    const handleConfirmCode = async () => {
        try {
            const response = await axios.post(
                CHECK_EMAIL_CODE_PATH,
                {
                    code: serverCode,
                    inputCode: verificationCode,
                },
                { withCredentials: true }
            );
            if (response.data.result === 0) {
                setShowPassChange(true); // 인증 코드가 일치하면 비밀번호 변경 부분을 보여줍니다.
                alert(`인증 코드가 일치합니다.`);
            } else {
                alert('인증 코드가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('인증 코드 확인 중 오류가 발생했습니다:', error);
            alert('인증 코드 확인 중 오류가 발생했습니다.');
        }
    };

    // 비밀번호 수정 로직
    const handleResetPassword = async () => {
        try {
            if (newPassword !== confirmNewPassword) {
                alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                return;
            }

            const response = await axios.get(`${CHANGEPASS_PATH}?uid=${uid}&pass=${newPassword}&email=${email}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                setPasswordResetSuccess(true);
                navigate('/');
            } else {
                alert('비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
            alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="find-pw-container">
            <div className="find-pw-update-container">
                <div className="find-pw-update-form">
                    <h3 className="find-pw-title">비밀번호 찾기</h3>
                    <form id="find-pw-form">
                        <div className="input-container">
                            <label htmlFor="userId">아이디</label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                placeholder="아이디 입력"
                                required
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="이메일 입력"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="button" id="request-code-button" onClick={handleRequestCode}>
                                인증코드 요청
                            </button>
                        </div>
                        <div id="verification-code-section" className={showVerificationCode ? 'show' : ''}>
                            <label htmlFor="verification-code">인증코드</label>
                            <input
                                type="text"
                                id="verification-code"
                                name="verification-code"
                                placeholder="인증코드 입력"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button type="button" id="confirm-code-button" onClick={handleConfirmCode}>
                                확인
                            </button>
                        </div>
                        {showPassChange && (
                            <div className="changePass">
                                <div className="pass1">
                                    <label htmlFor="newPassword">새로운 비밀번호</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="비밀번호 입력"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="pass2">
                                    <label htmlFor="confirmNewPassword">새로운 비밀번호 확인</label>
                                    <input
                                        type="password"
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        placeholder="비밀번호 확인"
                                        required
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    <button type="button" id="reset-password-button" onClick={handleResetPassword}>
                                        비밀번호 재설정
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FindPw;
