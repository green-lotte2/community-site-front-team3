import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Main from '../../components/main/Main';

const MainPage = () => {
    return (
        <DefaultLayout>
            <Main />
        </DefaultLayout>
    );
};

export default MainPage;

// 메인 페이지 전부 다 출력하기
// 선택 한 것들만 출력하기
// 출력할 것들? 사이드메뉴 전부: 프로젝트, 캘린더, 페이지, 게시판, 채팅, 고객센터, 최근본게시글
// 어떻게? 각각 컴포넌트로 만들어서 좌우 스크롤 카드형식으로 내가 보고싶은거만 볼 수 있게
// 페이지는 
// 일단 ㅇㅋ