import React from 'react';

const Notice = () => {
    return (
        <div className="notice">
            <img src="/images/icon/notification.png" alt="Feature Icon" style={{ width: '70px' }} />
            <h3>중요 공지</h3>
            <p>중요한 소식을 확인 하세요</p>
            <p className="time">방금 전</p>
        </div>
    );
};

export default Notice;
