import React, { useEffect } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Main from '../../components/main/Main';
import { getTest } from 'api/TestApi';

const MainPage = () => {
    useEffect(() => {
        console.log("인덱스 들어옴");
        // 비동기 함수 정의
        const fetchData = async () => {
            try {
                const response = await getTest("14:38");
                alert(response);

            } catch (error) {
                console.log(error);
            }
        };
        
        // 비동기 함수 호출
        fetchData();

          // cno(카테고리)가 변경될 때마다 실행
        }, []);

    return (
        <DefaultLayout>
            <Main />
        </DefaultLayout>
    );
};

export default MainPage;
