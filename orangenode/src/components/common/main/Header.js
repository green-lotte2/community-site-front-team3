import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
    return (
        <>
            <header>
                <div class="container">
                    <div class="logo">
                        <h1>Company Community</h1>
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
                                    <Link to="#">Admin</Link>
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
