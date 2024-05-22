import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
    return (
        <>
            <aside>
                <ul>
                    <li>
                        <Link to="/admin/article">게시판</Link>
                    </li>
                    <li>
                        <Link to="/admin/member">회원</Link>
                    </li>
                    <li>
                        <Link to="#">페이지</Link>
                    </li>
                    <li>
                        <Link to="#">프로젝트</Link>
                    </li>
                    <li>
                        <Link to="#">채팅방</Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
