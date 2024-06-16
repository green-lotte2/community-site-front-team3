import React from 'react';
import Recent from './Recent';
import Member from './Member';

const container = () => {
    return (
        <>
            <div className="container">
                <h2>관리자 메인</h2>
                <p>관리자 메인 페이지 입니다. 최신 게시글, 최신 회원 등을 확인 할 수 있습니다.</p>
                <div className="dashboard">
                    <Recent />
                    <Member />
                </div>
            </div>
        </>
    );
};

export default container;
