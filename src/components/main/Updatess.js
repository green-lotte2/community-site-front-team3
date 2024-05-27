import React from 'react';
import Update from './Update';
import Event from './Event';
import Notice from './Notice';
const Updates = () => {
    return (
        <>
            <div className="updatess">
                <h2>최근 업데이트</h2>
                <div className="updates">
                    <Update />
                    <Event />
                    <Notice />
                </div>
            </div>
        </>
    );
};

export default Updates;
