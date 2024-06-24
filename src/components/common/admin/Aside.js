import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
    const [isMemberSubmenuOpen, setIsMemberSubmenuOpen] = useState(false);
    const [isCsSubmenuOpen, setIsCsSubmenuOpen] = useState(false);

    const toggleMemberSubmenu = (e) => {
        e.stopPropagation();
        setIsMemberSubmenuOpen(!isMemberSubmenuOpen);
    };

    const toggleCsSubmenu = (e) => {
        e.stopPropagation();
        setIsCsSubmenuOpen(!isCsSubmenuOpen);
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
                        <Link to="/admin/member/list" onClick={toggleMemberSubmenu}>
                            <img src="/images/icon/user2.png" alt="회원" style={{ width: '15px' }} />
                            회원관리
                        </Link>
                        {isMemberSubmenuOpen && (
                            <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                                <li onClick={(e) => e.stopPropagation()}>
                                    <Link to="/admin/member/list">회원 목록</Link>
                                </li>
                                <li onClick={(e) => e.stopPropagation()}>
                                    <Link to="/admin/member/plan">요금제 관리</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className={`has-submenu ${isCsSubmenuOpen ? 'open' : ''}`}>
                        <Link to="#" onClick={toggleCsSubmenu}>
                            <img src="/images/icon/headset.png" alt="회원" style={{ width: '15px' }} />
                            고객센터
                        </Link>
                        {isCsSubmenuOpen && (
                            <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                                <li onClick={(e) => e.stopPropagation()}>
                                    <Link to="/admin/cs">문의 글목록</Link>
                                </li>
                                <li onClick={(e) => e.stopPropagation()}>
                                    <Link to="/admin/question">문의 접수</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
