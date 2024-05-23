import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [financeAgreed, setFinanceAgreed] = useState(false);

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (termsAgreed && privacyAgreed && financeAgreed) {
            navigate('/member/register');
        } else {
            alert('필수 약관을 동의해주세요.');
        }
    };
    return (
        <>
            <div className="container">
                <div className="signup-container">
                    <div className="signup-form">
                        <form onSubmit={handleFormSubmit}>
                            <div className="termsMain">
                                <h3>약관 내용</h3>
                            </div>
                            <p>회원가입을 위해 아래 내역에 동의해주세요</p>

                            <div className="terms">
                                <div className="term">
                                    <label className="term-label">이용약관 동의</label>
                                    <div className="term-content">
                                        <p>여기에 약관 내용을 입력하세요.</p>
                                    </div>
                                    <div className="term-actions">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            checked={termsAgreed}
                                            onChange={() => setTermsAgreed(!termsAgreed)}
                                        />
                                        <label htmlFor="terms">동의</label>
                                    </div>
                                </div>
                            </div>

                            <div className="privacy">
                                <div className="term">
                                    <label className="term-label">개인정보 수집약관 동의</label>
                                    <div className="term-content">
                                        <p>여기에 약관 내용을 입력하세요.</p>
                                    </div>
                                    <div className="term-actions">
                                        <input
                                            type="checkbox"
                                            name="privacy"
                                            checked={privacyAgreed}
                                            onChange={() => setPrivacyAgreed(!privacyAgreed)}
                                        />
                                        <label htmlFor="privacy">동의</label>
                                    </div>
                                </div>
                            </div>

                            <div className="finance">
                                <div className="term">
                                    <label className="term-label">전자금융 이용약관 동의</label>
                                    <div className="term-content">
                                        <p>여기에 약관 내용을 입력하세요.</p>
                                    </div>
                                    <div className="term-actions">
                                        <input
                                            type="checkbox"
                                            name="finance"
                                            checked={financeAgreed}
                                            onChange={() => setFinanceAgreed(!financeAgreed)}
                                        />
                                        <label htmlFor="finance">동의</label>
                                    </div>
                                </div>
                            </div>

                            <div className="location">
                                <div className="term">
                                    <label className="term-label">위치정보 이용약관 동의</label>
                                    <div className="term-content">
                                        <p>여기에 약관 내용을 입력하세요.</p>
                                    </div>
                                    <div className="term-actions">
                                        <input type="checkbox" name="location" />
                                        <label htmlFor="location">동의</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit">회원가입</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;
