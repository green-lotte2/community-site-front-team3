import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import LoginPage from '../pages/member/LoginPage';
import TermsPage from '../pages/member/TermsPage';
import RegisterPage from '../pages/member/RegisterPage';
import ProjectBoardPage from 'pages/project/ProjectBoardPage';
import ProjectListPage from 'pages/project/ProjectListPage';

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
]);

// 라우터 내보내기
export default root;
