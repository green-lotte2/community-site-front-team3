import React, { useEffect } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Main from '../../components/main/Main';
import { getTest } from 'api/TestApi';

const MainPage = () => {

    return (
        <DefaultLayout>
            <Main />
        </DefaultLayout>
    );
};

export default MainPage;
