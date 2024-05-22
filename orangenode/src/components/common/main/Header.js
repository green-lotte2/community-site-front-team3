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
<<<<<<< HEAD
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="#">Forums</Link>
                                </li>
                                <li>
                                    <Link to="/board/list">Board</Link>
                                </li>
                                <li>
                                    <Link to="/admin">Admin</Link>
=======
                                    <Link to="#">홈</Link>
                                </li>
                                <li>
                                    <Link to="#">로그인</Link>
>>>>>>> 97f971b0e24fb3ce5936cd7484056c003cefaa23
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
