import React from 'react';
import MemberList from './MemberList';
import MemberPlan from './MemberPlan';

const Container = () => {
    return (
        <>
            <div className="container">
                <h2>회원 관리</h2>
                <p>Manage your content and projects efficiently</p>
                <div className="member-plan">
                    <MemberList />
                    <MemberPlan />
                </div>
            </div>
        </>
    );
};

export default Container;
