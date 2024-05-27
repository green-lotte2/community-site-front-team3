import React from 'react';

const Recent = () => {
    return (
        <>
            <div className="recent-items">
                <h3>최근 게시물</h3>
                <div className="item">
                    <img src="post_icon.png" alt="Post Icon" />
                    <p>
                        최신 게시글
                        <br />
                        John Doe
                    </p>
                    <p className="time">2 hours ago</p>
                </div>
                <div className="item">
                    <img src="project_icon.png" alt="Project Icon" />
                    <p>
                        최신 프로젝트
                        <br />
                        Project ABC
                    </p>
                    <p className="time">1 day ago</p>
                </div>
            </div>
        </>
    );
};

export default Recent;
