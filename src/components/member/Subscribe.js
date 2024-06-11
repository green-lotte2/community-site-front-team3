import axios from 'axios';
import React from 'react';
import { UPDATE_GRADE_PATH } from 'requestPath';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const navigate = useNavigate();
    const uid = authSlice.uid;

    const handleMvpSubscribe = async () => {
        const confirmed = window.confirm('MVP 요금제 가입을 하시겠습니까?');
        if (confirmed) {
            const response = await axios.patch(UPDATE_GRADE_PATH, { uid, grade: 'MVP' });
            if (response.data === 1) {
                alert('MVP 회원이 되신걸 환영합니다');
                navigate('/main');
            } else {
                alert('가입에 실패하셨습니다');
            }
        }
    };

    const handleFreeSubscribe = () => {
        navigate('/member/terms');
    };

    return (
        <div class="pricing-container">
            <h1 class="pricing-title">요금 안내</h1>
            <div class="pricing-cards">
                <div class="card">
                    <h2 class="free-card-title">FREE</h2>
                    <p class="free-price">멤버당 0원 /월</p>
                    <button class="free-subscribe-button" onClick={handleFreeSubscribe}>
                        가입하기
                    </button>
                    <div className="free-regi">
                        <p className="free-p">협업툴이 처음이신 소규모 팀에 추천합니다</p>
                        <ul class="features">
                            <li>✔️ 자유게시판 이용 가능</li>
                            <li>✔️ 프로젝트 생성 가능</li>
                            <li>✔️ 업무 효율 상승</li>
                            <li>✔️ 프로젝트 관리</li>
                            <li>✔️ 무제한 채팅</li>
                        </ul>
                    </div>
                </div>
                <div class="card">
                    <h2 class="mvp-card-title">MVP</h2>
                    <p class="mvp-price">멤버당 6000원 /월</p>
                    <button class="mvp-subscribe-button" onClick={handleMvpSubscribe}>
                        가입하기
                    </button>
                    <div className="mvp-regi">
                        <p className="mvp-p">전문적인 협업을 위한 팀에 추천합니다</p>
                        <ul class="features">
                            <li>✔️ 모든 게시판 이용 가능</li>
                            <li>✔️ 무제한 페이지 생성</li>
                            <li>✔️ 채팅방 생성 가능</li>
                            <li>✔️ 업무 시스템 연동</li>
                            <li>✔️ 조직도</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
