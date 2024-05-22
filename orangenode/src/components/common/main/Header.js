import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
    return (
        <>
            <header>
                <div class="container">
                    <div class="logo">
                    <img src="/images/logo/logo6.png" alt="aa" style={{ width: "120px" }} />

                    </div>
                    <div class="nav-search">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="#">Home</Link>
                                </li>
                                <li>
                                    <Link to="#">Forums</Link>
                                </li>
                                <li>
                                    <Link to="#">Events</Link>
                                </li>
                                <li>
                                    <Link to="/admin">Admin</Link>
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

export default header;
