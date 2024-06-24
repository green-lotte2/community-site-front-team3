import React, { useState, useEffect } from 'react';
import MainCalendar from './MainCalendar';
import MainProfile from './MainProfile';
import MainRecentArticles from './MainRecentArticles';
import { useSelector } from 'react-redux';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import IconButton from '@mui/material/IconButton';
import Moment from 'react-moment';
const Main = () => {
    const authSlice = useSelector((state) => state.authSlice);
    console.log('main:', authSlice);
    const defaultVisibleComponents = {
        calendar: true,
        profile: true,
        article: true,
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
        <div
            style={{
                backgroundImage: 'url(/images/background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'relative',
                }}
            >
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
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: '10px',
                                }}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        name="profile"
                                        checked={visibleComponents.profile}
                                        onChange={handleCheckboxChange}
                                    />
                                    내 프로필
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="article"
                                        checked={visibleComponents.article}
                                        onChange={handleCheckboxChange}
                                    />
                                    최근 게시글
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="calendar"
                                        checked={visibleComponents.calendar}
                                        onChange={handleCheckboxChange}
                                    />
                                    예정된 이벤트
                                </label>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div id="main-component">
                {visibleComponents.profile && <MainProfile />}
                {visibleComponents.article && <MainRecentArticles />}
                {visibleComponents.calendar && <MainCalendar />}
            </div>
        </div>
    );
};
export default Main;











