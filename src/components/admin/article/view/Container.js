import React from 'react';
import { Link } from 'react-router-dom';

const Container = () => {
    return (
        <>
            <div className="container">
                <h2>게시글 관리</h2>
                <p>Manage your content and projects efficiently</p>
                <div className="post-details">
                    <div className="post-header">
                        <h3>제목</h3>
                        <div className="post-info">
                            <span>작성자: 이름</span>
                            <span>날짜: 2023-05-20</span>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>내용</p>
                    </div>
                    <div className="post-actions">
                        <Link to="#" className="list">
                            목록
                        </Link>
                        <div className="actions-right">
                            <Link to="#" className="delete">
                                삭제
                            </Link>
                            <Link to="#" className="edit">
                                수정
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Container;
