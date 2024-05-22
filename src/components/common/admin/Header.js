import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header>
                <div className="container">
                    <img src="/images/logo/logo13.png" alt="aa" style={{ width: '160px' }} />
                    <div className="logo">
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className="nav-search">
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
                        <div className="search">
                            <input type="text" placeholder="Search in site" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
