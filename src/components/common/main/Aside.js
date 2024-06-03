import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { IoChatboxEllipses } from 'react-icons/io5';
import { MdContactPage } from 'react-icons/md';
import { RiCustomerServiceFill } from 'react-icons/ri';
import { AiFillProject } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';

const Aside = () => {
    const dynamicPath = '/project/list';
    return (
        <>
            <aside>
                <ul>
                    <li>
                        <Link to="/main">
                            <FaHome size={20} color="#009425" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={dynamicPath}>
                            <AiFillProject size={20} color="#ff8916" />
                            프로젝트
                        </Link>
                    </li>
                    <li>
                        <Link to="/calendar">
                            <FaCalendarAlt size={20} color="#009425" />
                            캘린더
                        </Link>
                    </li>
                    <li>
                        <Link to="/page">
                            <MdContactPage size={20} color="#ff8916" />
                            페이지
                        </Link>
                    </li>
                    <li>
                        <Link to="/board/list">
                            <FaClipboardList size={20} color="#009425" />
                            게시판
                        </Link>
                    </li>
                    <li>
                        <Link to="/chat">
                            <IoChatboxEllipses size={20} color="#ff8916" />
                            채팅
                        </Link>
                    </li>
                    <li>
                        <Link to="/cs">
                            <RiCustomerServiceFill size={20} color="#009425" />
                            고객센터
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
