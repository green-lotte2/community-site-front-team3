import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Main from '../../components/main/Main';
import MonthCalendar from 'components/calendar/MonthCalendar';

const MainPage = () => {
    return (
        <DefaultLayout>
            <Main />
            <div className="calendar" style={{ width: '300px', height: '400px' }}>
                <MonthCalendar />
            </div>
        </DefaultLayout>
    );
};

export default MainPage;
