import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
    const [isMemberSubmenuOpen, setIsMemberSubmenuOpen] = useState(false);

    const toggleMemberSubmenu = (e) => {
        e.stopPropagation();
        setIsMemberSubmenuOpen(!isMemberSubmenuOpen);
    };

    return (
        <>
            <aside>
                <ul>
                    <li>
                        <Link to="/admin">
                            <img src="/images/icon/home.png" alt="헤드셋" style={{ width: '15px' }} />
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/article">
                            <img src="/images/icon/article.png" alt="게시판" style={{ width: '15px' }} />
                            게시판
                        </Link>
                    </li>
                    <li className={`has-submenu ${isMemberSubmenuOpen ? 'open' : ''}`}>
                        <Link to="/admin/member" onClick={toggleMemberSubmenu}>
                            <img src="/images/icon/user2.png" alt="회원" style={{ width: '15px' }} />
                            회원관리
                        </Link>
                        {isMemberSubmenuOpen && (
                            <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                                <li onClick={(e) => e.stopPropagation()}>
                                    <Link to="/admin/member/list">회원 목록</Link>
                                </li>
                                <li onClick={(e) => e.stopPropagation()}>
                                    <Link to="/admin/member/list">요금제 관리</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to="#">
                            <img src="/images/icon/headset.png" alt="CS" style={{ width: '15px' }} />
                            고객센터
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
