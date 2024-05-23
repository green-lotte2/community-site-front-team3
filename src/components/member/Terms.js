import React from 'react';

const Terms = () => {
    return (
        <>
            <div className="container">
                <div className="signup-container">
                    <div className="signup-form">
                        <form>
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
                                        <input type="checkbox" id="terms" name="terms" />
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
                                        <input type="checkbox" id="privacy" name="privacy" />
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
                                        <input type="checkbox" id="finance" name="finance" />
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
                                        <input type="checkbox" id="location" name="location" />
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
