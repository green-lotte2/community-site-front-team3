import React from 'react';
import Recents from './Recents';
import MainCalendar from './MainCalendar';
import MainPages from './MainPages';
import MainChat from './MainChat';
import MainArticles from './MainArticles';
import MainCs from './MainCs';
import MainProj from './MainProj';
import MainEventList from './MainEventList'; // EventList 컴포넌트를 가져옵니다.
import { useSelector } from 'react-redux';
const Main = () => {
    const authSlice = useSelector((state) => state.authSlice);
    console.log('main:', authSlice);
    return (
        <>
            <Recents />
            <MainCalendar />
            <MainProj />
            <MainPages />
            <MainChat />
            <MainArticles />
            <MainCs />
        </>
    );
};

export default Main;
