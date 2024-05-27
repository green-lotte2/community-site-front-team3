import React from 'react';

const Updates = () => {
    return (
        <>
            <div className="updatess">
                <h2>최근 업데이트</h2>
                <div className="updates">
                    <div className="update">
                        <img src="/images/icon/notification.png" alt="Feature Icon" style={{ width: '70px' }} />
                        <h3>새로운 기능 출시</h3>
                        <p>최신 업데이트를 확인하세요</p>

                        <p className="time">5일 전</p>
                    </div>
                    <div className="update">
                        <img src="/images/icon/notification.png" alt="Feature Icon" style={{ width: '70px' }} />
                        <h3>다가오는 행사</h3>
                        <p>커뮤니티 모임 날짜를 저장하세요</p>
                        <p className="time">2주 후</p>
                    </div>
                    <div className="update">
                        <img src="/images/icon/notification.png" alt="Feature Icon" style={{ width: '70px' }} />
                        <h3>중요 공지</h3>
                        <p>중요한 소식을 확인 하세요</p>
                        <p className="time">방금 전</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Updates;
