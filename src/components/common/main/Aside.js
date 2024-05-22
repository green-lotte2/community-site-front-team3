import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
    return (
        <>
            <aside>
                <ul>
                    <li>
                        <Link to="#">프로젝트</Link>
                    </li>
                    <li>
                        <Link to="#">캘린더</Link>
                    </li>
                    <li>
                        <Link to="#">페이지</Link>
                    </li>
                    <li>
                        <Link to="#">게시판</Link>
                    </li>
                    <li>
                        <Link to="#">채팅</Link>
                    </li>
                    <li>
                        <Link to="#">고객센터</Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
