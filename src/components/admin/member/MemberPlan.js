import React from 'react';

const MemberPlan = () => {
    return (
        <>
            <div class="plan-details">
                <h3>사용 플랜</h3>
                <p>Available Plans for Members</p>
                <div class="plans">
                    <div class="plan">
                        <h4>Plan A</h4>
                        <p>Standard</p>
                        <p>Features: x, y, z</p>
                    </div>
                    <div class="plan">
                        <h4>Plan B</h4>
                        <p>Premium</p>
                        <p>Features: a, b, c</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberPlan;
