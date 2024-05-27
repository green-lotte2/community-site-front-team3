import React from 'react';

const Event = () => {
    return (
        <>
            <div className="event">
                <img src="/images/icon/notification.png" alt="Feature Icon" style={{ width: '70px' }} />
                <h3>다가오는 행사</h3>
                <p>커뮤니티 모임 날짜를 저장하세요</p>
                <p className="time">2주 후</p>
            </div>
        </>
    );
};

export default Event;
