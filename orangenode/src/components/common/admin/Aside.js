import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
    return (
        <>
            <aside>
                <ul>
                    <li>
                        <img src="/images/icon/headset.png" alt="헤드셋" style={{ width: '15px' }} />
                        <Link to="/admin">HOME</Link>
                    </li>
                    <li>
                        <img src="/images/icon/headset.png" alt="헤드셋" style={{ width: '15px' }} />
                        <Link to="/admin/article">게시판</Link>
                    </li>
                    <li>
                        <Link to="/admin/member">
                            <i aria-hidden="true"></i>회원관리
                        </Link>
                        <img src="/images/icon/headset.png" alt="헤드셋" style={{ width: '15px' }} />
                        <Link to="/admin/member/list"></Link>
                    </li>
                    <li>
                        <img src="/images/icon/headset.png" alt="헤드셋" style={{ width: '15px' }} />
                        <Link to="#">고객센터</Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
