import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UPDATE_GRADE_PATH } from 'requestPath';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { globalPath } from 'globalPaths';
import { fetchUserGrade, updateGrade } from 'api/UserApi';

const url = globalPath.path;

const Subscribe = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const navigate = useNavigate();
    const [userGrade, setUserGrade] = useState();
    const uid = authSlice.uid;

     // 요금제 등급 가입 및 탈퇴 핸들러
     const handleMvpSubscribe = () => {
        updateGrade(uid, userGrade).then(success => {
            if (success) {
                navigate('/main');
            }
        });
    };
    // 화면 렌더링 시 회원 등급 상태 업데이트
    useEffect(() => {
        fetchUserGrade(url, uid)
            .then(grade => {
                console.log('response check111:', grade);
                setUserGrade(grade);
            })
            .catch(error => {
                console.error('등급 변경 에러', error);
            });
    }, [url, uid]);

    // 회원이 아니라면 회원가입 버튼
    const handleFreeSubscribe = () => {
        if (!authSlice) {
            navigate('/member/terms');
        }
    };

    return (
        <div class="pricing-container">
            <h1 class="pricing-title">요금 안내</h1>
            <h3 class="pricing-grade">현재 당신의 등급은 {userGrade} 입니다</h3>
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
                        {userGrade === 'MVP' ? '탈퇴하기' : '가입하기'}
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
