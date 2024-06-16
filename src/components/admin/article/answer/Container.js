import React from 'react';
import { Link } from 'react-router-dom';

const Container = () => {
    return (
        <>
            <div className="container">
                <h2>문의 답변</h2>
                <div className="tabs">
                    <Link to="#" className="active">
                        Overview
                    </Link>
                    <Link to="#">Tasks</Link>
                    <Link to="#">Documents</Link>
                    <Link to="#">Team</Link>
                    <Link to="#">Reports</Link>
                    <Link to="#">Admin</Link>
                </div>
                <div className="content-section">
                    <div className="post-content">
                        <h3>글 내용</h3>
                        <div className="content-box"></div>
                    </div>
                    <div className="response-section">
                        <h3>답변하기</h3>
                        <div className="response-box"></div>
                    </div>
                    <div className="response-actions">
                        <button>답변완료</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Container;
