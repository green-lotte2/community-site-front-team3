import React from 'react';
import { Link } from 'react-router-dom';

const Container = () => {
    return (
        <>
            <div class="container">
                <h2>게시글 관리</h2>
                <p>Manage your content and projects efficiently</p>
                <div class="post-details">
                    <div class="post-header">
                        <h3>제목</h3>
                        <div class="post-info">
                            <span>작성자: 이름</span>
                            <span>날짜: 2023-05-20</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>내용</p>
                    </div>
                    <div class="post-actions">
                        <Link to="#" class="list">
                            목록
                        </Link>
                        <div class="actions-right">
                            <Link to="#" class="delete">
                                삭제
                            </Link>
                            <Link to="#" class="edit">
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
