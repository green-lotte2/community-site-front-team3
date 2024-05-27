import React from 'react';

const Recent = () => {
    return (
        <>
            <div class="recent-items">
                <h3>최근 게시물</h3>
                <div class="item">
                    <img src="post_icon.png" alt="Post Icon" />
                    <p>
                        최신 게시글
                        <br />
                        John Doe
                    </p>
                    <p class="time">2 hours ago</p>
                </div>
                <div class="item">
                    <img src="project_icon.png" alt="Project Icon" />
                    <p>
                        최신 프로젝트
                        <br />
                        Project ABC
                    </p>
                    <p class="time">1 day ago</p>
                </div>
            </div>
        </>
    );
};

export default Recent;
