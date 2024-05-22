import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header>
                <div class="container">
                    <div class="logo">
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div class="nav-search">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="#">HOME</Link>
                                </li>
                                <li>
                                    <Link to="#">로그인/가입</Link>
                                </li>
                            </ul>
                        </nav>
                        <div class="search">
                            <input type="text" placeholder="Search in site" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
