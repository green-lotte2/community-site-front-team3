import React, { useState, useEffect } from 'react';
import Recents from './Recents';
import MainCalendar from './MainCalendar';
import MainPages from './MainPages';
import MainChat from './MainChat';
import MainArticles from './MainArticles';
import MainCs from './MainCs';
import MainProj from './MainProj';
import { useSelector } from 'react-redux';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

const Main = () => {
    const authSlice = useSelector((state) => state.authSlice);
    console.log('main:', authSlice);

    // true일 때 랜더링 하기
    const defaultVisibleComponents = {
        calendar: true,
        proj: true,
        pages: true,
        chat: true,
        articles: true,
        cs: true,
    };

    // 로컬 스토리지에서 상태 불러오기
    const [visibleComponents, setVisibleComponents] = useState(() => {
        const savedState = localStorage.getItem('visibleComponents');
        return savedState ? JSON.parse(savedState) : defaultVisibleComponents;
    });

    // 메뉴 숨기기
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // 상태가 바뀔 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('visibleComponents', JSON.stringify(visibleComponents));
    }, [visibleComponents]);

    // 체크박스 설정
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setVisibleComponents((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                <IconButton onClick={toggleDropdown}>
                    <MoreVertTwoToneIcon />
                </IconButton>
                {dropdownVisible && (
                    <div
                        style={{
                            position: 'absolute',
                            border: '1px solid black',
                            backgroundColor: 'rgba(226, 222, 222, 0.4)', // 배경색과 투명도 설정
                            zIndex: 1,
                            right: 0,
                            top: '100%',
                            marginTop: '10px',
                            padding: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 추가
                            borderRadius: '4px', // 모서리 둥글게 설정
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="calendar"
                                    checked={visibleComponents.calendar}
                                    onChange={handleCheckboxChange}
                                />
                                예정된 이벤트
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="proj"
                                    checked={visibleComponents.proj}
                                    onChange={handleCheckboxChange}
                                />
                                참가 중인 프로젝트
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="pages"
                                    checked={visibleComponents.pages}
                                    onChange={handleCheckboxChange}
                                />
                                나의 페이지
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="chat"
                                    checked={visibleComponents.chat}
                                    onChange={handleCheckboxChange}
                                />
                                참가 중인 채팅
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="articles"
                                    checked={visibleComponents.articles}
                                    onChange={handleCheckboxChange}
                                />
                                나의 게시글
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="cs"
                                    checked={visibleComponents.cs}
                                    onChange={handleCheckboxChange}
                                />
                                고객문의
                            </label>
                        </div>
                    </div>
                )}
            </div>
            <Recents />

            {visibleComponents.calendar && <MainCalendar />}
            {visibleComponents.proj && <MainProj />}
            {visibleComponents.pages && <MainPages />}
            {visibleComponents.chat && <MainChat />}
            {visibleComponents.articles && <MainArticles />}
            {visibleComponents.cs && <MainCs />}
        </>
    );
};

export default Main;
