import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import LoginPage from '../pages/member/LoginPage';
import TermsPage from '../pages/member/TermsPage';
import RegisterPage from '../pages/member/RegisterPage';
import ProjectBoardPage from 'pages/project/ProjectBoardPage';
import ProjectListPage from 'pages/project/ProjectListPage';
import List from 'pages/board/List';
import Modify from 'pages/board/Modify';
import Register from 'pages/board/Register';
import View from 'pages/board/View';
import NewPage from 'pages/newPage/NewPage';

// 라우터 생성
const root = createBrowserRouter([
    // main
    { path: '/', element: <MainPage /> },
    // member
    { path: '/member/login', element: <LoginPage /> },
    { path: '/member/register', element: <RegisterPage /> },
    { path: '/member/terms', element: <TermsPage /> },
    // project
    { path: '/project/board', element: <ProjectBoardPage /> },
    { path: '/project/list', element: <ProjectListPage /> },
    { path: '/member/terms', element: <TermsPage /> },

    // board
    { path: '/board/list', element: <List /> },
    { path: '/board/modify', element: <Modify /> },
    { path: '/board/register', element: <Register /> },
    { path: '/board/view', element: <View /> },

    // newPage
    { path: '/board/newPage', element: <NewPage /> },

]);

// 라우터 내보내기
export default root;
