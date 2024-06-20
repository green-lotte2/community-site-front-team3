import React, { useState } from 'react';
import axios from 'axios';
import { SEND_EMAIL_CODE_PATH, FINDID_PATH, CHECK_EMAIL_CODE_PATH, SEND_FINDID_EMAIL_CODE_PATH } from 'requestPath';
import { Link } from 'react-router-dom';

const FindId = () => {
    const [showVerificationCodeSection, setShowVerificationCodeSection] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [serverCode, setServerCode] = useState('');

    // 아이디 찾기 인증코드 전송
    const handleRequestCode = async () => {
        try {
            const response = await axios.post(SEND_FINDID_EMAIL_CODE_PATH, { email }, { withCredentials: true });
            if (response.status === 200) {
                setShowVerificationCodeSection(true);
                setVerificationSent(true);
                setServerCode(response.data.code);
                alert('인증코드가 이메일로 전송되었습니다.');
            } else {
                alert('전송 실패.');
            }
        } catch (error) {
            alert('이메일 주소가 틀렸습니다.');
        }
    };

    // 이메일 중복 검사 및 인증코드 체크
    const handleConfirmCode = async () => {
        try {
            const response = await axios.post(
                CHECK_EMAIL_CODE_PATH,
                {
                    code: serverCode,
                    inputCode: verificationCode,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                const { result } = response.data;
                if (result === 0) {
                    const userIdResponse = await axios.get(`${FINDID_PATH}?name=${name}&email=${email}`, {
                        withCredentials: true,
                    });
                    if (userIdResponse.status === 200) {
                        setUid(userIdResponse.data.uid);
                    } else {
                        alert('유저가 없습니다.');
                    }
                } else {
                    alert('올바르지 않은 인증 코드입니다.');
                }
            } else {
                alert('인증 실패. 서버 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('인증 실패. 네트워크 오류가 발생했습니다.');
        }
    };

    return (
        <div className="find-id-container">
            <div className="find-id-update-container">
                <div className="find-id-update-form">
                    <h3 className="find-id-title">아이디 찾기</h3>
                    <form id="find-id-form">
                        <div className="input-container">
                            <label htmlFor="name">이름 </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="이름 입력"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">이메일 </label>
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
                        <div id="verification-code-section" className={showVerificationCodeSection ? 'show' : ''}>
                            <label htmlFor="verification-code">인증코드 </label>
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
                    </form>
                    {uid && <p>사용자 아이디: {uid}</p>}
                    <div className="link-container">
                        <Link to="/">로그인</Link> | <Link to="/member/findpw">비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindId;
