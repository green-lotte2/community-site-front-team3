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
import IconButton from '@mui/material/IconButton';

const Main = () => {
    const authSlice = useSelector((state) => state.authSlice);
    console.log('main:', authSlice);

    const defaultVisibleComponents = {
        calendar: true,
        proj: true,
        pages: true,
        chat: true,
        articles: true,
        cs: true,
    };

    const [visibleComponents, setVisibleComponents] = useState(() => {
        const savedState = localStorage.getItem('visibleComponents');
        return savedState ? JSON.parse(savedState) : defaultVisibleComponents;
    });

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [widgetMenuVisible, setWidgetMenuVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem('visibleComponents', JSON.stringify(visibleComponents));
    }, [visibleComponents]);

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

    const toggleWidgetMenu = () => {
        setWidgetMenuVisible(!widgetMenuVisible);
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
                            backgroundColor: 'rgba(226, 222, 222, 0.4)',
                            zIndex: 1,
                            right: 0,
                            top: '100%',
                            marginTop: '10px',
                            padding: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            flexDirection: 'column',
                        }}
                    >
                        <label onClick={toggleWidgetMenu} style={{ cursor: 'pointer' }}>
                            위젯 설정 / 숨기기
                        </label>
                        {widgetMenuVisible && (
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
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
                                    작업 중인 페이지
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
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div id="main-component">
                <Recents />
                {visibleComponents.calendar && <MainCalendar />}
                {visibleComponents.proj && <MainProj />}
                {visibleComponents.pages && <MainPages />}
                {visibleComponents.chat && <MainChat />}
                {visibleComponents.articles && <MainArticles />}
            </div>
        </>
    );
};

export default Main;
