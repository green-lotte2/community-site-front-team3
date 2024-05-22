import React from 'react';
import { Link } from 'react-router-dom';

const Container = () => {
    return (
        <>
            <div class="container">
                <h2>문의 답변</h2>
                <div class="tabs">
                    <Link to="#" class="active">
                        Overview
                    </Link>
                    <Link to="#">Tasks</Link>
                    <Link to="#">Documents</Link>
                    <Link to="#">Team</Link>
                    <Link to="#">Reports</Link>
                    <Link to="#">Admin</Link>
                </div>
                <div class="content-section">
                    <div class="post-content">
                        <h3>글 내용</h3>
                        <div class="content-box"></div>
                    </div>
                    <div class="response-section">
                        <h3>답변하기</h3>
                        <div class="response-box"></div>
                    </div>
                    <div class="response-actions">
                        <button>답변완료</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Container;
