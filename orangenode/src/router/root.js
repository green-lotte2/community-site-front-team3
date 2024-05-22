import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import AdminPage from '../pages/admin/AdminPage';
import AdminMember from '../pages/admin/AdminMember';
import AdminMemberList from '../pages/admin/AdminMemberList';
import AdminArticleList from '../pages/admin/AdminArticleList';
import AdminArticleView from '../pages/admin/AdminArticleView';
import AdminArticleAnswer from '../pages/admin/AdminArticleAnswer';

// 라우터 생성
const root = createBrowserRouter([
    { path: '/', element: <MainPage /> },
    { path: '/admin', element: <AdminPage /> },
    { path: '/admin/member', element: <AdminMember /> },
    { path: '/admin/member/list', element: <AdminMemberList /> },
    { path: '/admin/article', element: <AdminArticleList /> },
    { path: '/admin/article/view', element: <AdminArticleView /> },
    { path: '/admin/article/view/answer', element: <AdminArticleAnswer /> },
]);

// 라우터 내보내기
export default root;
