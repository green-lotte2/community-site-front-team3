import { Navigate, createBrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import AdminPage from '../pages/admin/AdminPage';
import AdminMember from '../pages/admin/AdminMember';
import AdminMemberList from '../pages/admin/AdminMemberList';
import AdminArticleList from '../pages/admin/AdminArticleList';
import AdminArticleView from '../pages/admin/AdminArticleView';
import AdminArticleAnswer from '../pages/admin/AdminArticleAnswer';
import LoginPage from '../pages/member/LoginPage';
import TermsPage from '../pages/member/TermsPage';
import RegisterPage from '../pages/member/RegisterPage';
import ProjectBoardPage from 'pages/project/ProjectBoardPage';
import ProjectListPage from 'pages/project/ProjectListPage';
import KanbanPage from 'pages/project/KanbanPage';
import List from 'pages/board/List';
import Modify from 'pages/board/Modify';
import Register from 'pages/board/Register';
import View from 'pages/board/View';
import NewPage from 'pages/newPage/NewPage';
import Chatpage from 'pages/chat/ChatPage';
import Calendar from 'pages/calendar/Calendar';
import Cs from 'pages/cs/CsPage';
import WritePage from 'pages/cs/WritePage';

import ProfileUpdatePage from 'pages/member/ProfileUpdatePage';
import CheckPassPage from 'pages/member/CheckPassPage';

// 라우터 생성
const root = createBrowserRouter([
    // main
    { path: '/main', element: <MainPage /> },
    { path: '/chatroom/:uid', element: <Chatpage /> },

    // admin
    { path: '/admin', element: <AdminPage /> },
    { path: '/admin/member', element: <AdminMember /> },
    { path: '/admin/member/list', element: <AdminMemberList /> },
    { path: '/admin/article', element: <AdminArticleList /> },
    { path: '/admin/article/:ano', element: <AdminArticleView /> },
    { path: '/admin/article/view/answer', element: <AdminArticleAnswer /> },

    // member
    { path: '/', element: <LoginPage /> },
    { path: '/member/register', element: <RegisterPage /> },
    { path: '/member/terms', element: <TermsPage /> },
    { path: '/member/logout', element: <Navigate replace to="/" /> },
    { path: '/member/passcheck', element: <CheckPassPage /> },
    { path: '/member/profile', element: <ProfileUpdatePage /> },

    // project
    { path: '/project/board', element: <ProjectBoardPage /> },
    { path: '/project/list', element: <ProjectListPage /> },
    { path: '/project/kanban', element: <KanbanPage /> },

    // board
    { path: '/board/list', element: <List /> },
    { path: '/board/modify', element: <Modify /> },
    { path: '/board/register', element: <Register /> },
    { path: '/board/view', element: <View /> },

    // newPage
    { path: '/page/:pageNo', element: <NewPage /> },

    // chat
    { path: '/chat', element: <Chatpage /> },

    // calendar
    { path: '/calendar', element: <Calendar /> },

    // cs
    { path: '/cs', element: <Cs /> },
    { path: '/write', element: <WritePage /> },
]);

// 라우터 내보내기
export default root;
