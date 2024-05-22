import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
    return (
        <>
            <header>
                <div class="container">
                    <div class="logo">
                        <Link to="#">OrangeNode</Link>
                    </div>
                    <div class="nav-search">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="#">홈</Link>
                                </li>
                                <li>
                                    <Link to="#">로그인</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default header;
