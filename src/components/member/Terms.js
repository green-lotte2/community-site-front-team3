import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalPath } from 'globalPaths';

const Terms = () => {
    const [terms, setTerms] = useState({
        terms: '',
        privacy: '',
        age: '',
    });
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [ageAgreed, setAgeAgreed] = useState(false);
    const [allAgreed, setAllAgreed] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        selectTerms();
    }, []);

    const selectTerms = async () => {
        try {
            const response = await axios.get(`${globalPath.terms}`);
            const termsData = response.data[0];
            setTerms({ terms: termsData.terms, privacy: termsData.privacy, age: termsData.age });
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    const handleAllAgree = () => {
        setTermsAgreed(!allAgreed);
        setPrivacyAgreed(!allAgreed);
        setAgeAgreed(!allAgreed);
        setAllAgreed(!allAgreed);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        switch (name) {
            case 'terms':
                setTermsAgreed(checked);
                break;
            case 'privacy':
                setPrivacyAgreed(checked);
                break;
            case 'age':
                setAgeAgreed(checked);
                break;
            default:
                break;
        }
        if (termsAgreed && privacyAgreed && ageAgreed) {
            setAllAgreed(true);
        } else {
            setAllAgreed(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (termsAgreed && privacyAgreed && ageAgreed) {
            navigate(`${globalPath.regitserPath}`);
        } else {
            alert('필수 약관을 동의해주세요.');
        }
    };

    const openModal = (content) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent("");
    };

    return (
        <div className="container">
            <div className="terms-container">
                <div className="terms-form">
                    <form onSubmit={handleFormSubmit}>
                        <div className="termsMain">
                            <h3>오렌지노드 약관 동의</h3>
                            <p>회원가입을 위해 아래 내역에 동의해주세요</p>
                        </div>

                        <div className="term">
                            <label className="term-allcheck">
                                <input
                                    type="checkbox"
                                    checked={allAgreed}
                                    onChange={handleAllAgree}
                                />
                                모두 동의
                            </label>
                        </div>

                        <hr style={{ margin: '20px 0' }} />

                        <div className="terms">
                            <div className="term">
                                <label className="term-label">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        checked={termsAgreed}
                                        onChange={handleCheckboxChange}
                                    />
                                    [필수] 이용 약관 동의
                                    <span onClick={() => openModal(terms.terms)}>
                                        보기
                                    </span>
                                </label>
                            </div>
                            <div className="term">
                                <label className="term-label">
                                    <input
                                        type="checkbox"
                                        name="privacy"
                                        checked={privacyAgreed}
                                        onChange={handleCheckboxChange}
                                    />
                                    [필수] 개인정보 수집 동의
                                    <span onClick={() => openModal(terms.privacy)}>
                                        보기
                                    </span>
                                </label>
                            </div>
                            <div className="term">
                                <label className="term-label">
                                    <input
                                        type="checkbox"
                                        name="age"
                                        checked={ageAgreed}
                                        onChange={handleCheckboxChange}
                                    />
                                    [필수] 만 14세 이상입니다.
                                    <span onClick={() => openModal(terms.age)}>
                                        보기
                                    </span>
                                </label>
                            </div>
                        </div>

                        <button type="submit">다음</button>
                    </form>
                </div>
            </div>

            {modalContent && (
                <div className="modal">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{modalContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Terms;
