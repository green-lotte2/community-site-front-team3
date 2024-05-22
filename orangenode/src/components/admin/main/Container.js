import React from 'react';
import Recent from './Recent';
import Member from './Member';

const container = () => {
    return (
        <>
            <div class="container">
                <h2>관리자 메인</h2>
                <p>Manage your content and projects efficiently</p>
                <div class="dashboard">
                    <Recent />
                    <Member />
                </div>
            </div>
        </>
    );
};

export default container;
