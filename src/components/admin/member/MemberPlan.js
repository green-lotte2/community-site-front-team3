import React from 'react';

const MemberPlan = () => {
    return (
        <div className="container">
            <h2>요금제 관리</h2>
            <p>요금제의 내용을 수정하고 관리합니다.</p>
            <div className="pricing-cards">
                <div className="card">
                    <h2 className="free-card-title">FREE</h2>
                    <p className="free-price">멤버당 0원 /월</p>
                    <div className="free-regi">
                        <p className="free-p">협업툴이 처음이신 소규모 팀에 추천합니다</p>
                        <ul className="features">
                            <li>✔️ 자유게시판 이용 가능</li>
                            <li>✔️ 프로젝트 생성 가능</li>
                            <li>✔️ 업무 효율 상승</li>
                            <li>✔️ 프로젝트 관리</li>
                            <li>✔️ 무제한 채팅</li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <h2 className="mvp-card-title">MVP</h2>
                    <p className="mvp-price">멤버당 6000원 /월</p>
                    <button className="mvp-subscribe-button"></button>
                    <div className="mvp-regi">
                        <p className="mvp-p">전문적인 협업을 위한 팀에 추천합니다</p>
                        <ul className="features">
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

export default MemberPlan;
