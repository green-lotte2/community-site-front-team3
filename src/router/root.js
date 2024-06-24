import { Navigate, createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";

import MainPage from "../pages/main/MainPage";
import AdminPage from "../pages/admin/AdminPage";
import AdminMemberPlan from "../pages/admin/AdminMemberPlan";
import AdminMemberList from "../pages/admin/AdminMemberList";
import AdminArticleList from "../pages/admin/AdminArticleList";
import AdminArticleView from "../pages/admin/AdminArticleView";
import AdminArticleAnswer from "../pages/admin/AdminArticleAnswer";
import AdminCsListPage from "../pages/admin/AdminCsListPage";
import AdminQuestionPage from "../pages/admin/AdminQuestionPage";
import ProfileUpdatePage from "pages/member/ProfileUpdatePage";
import CheckPassPage from "pages/member/CheckPassPage";
import KakaoRedirectPage from "pages/member/KakaoRedirectPage";
import SubscribePage from "pages/member/SubscribePage";
import LoginPage from "../pages/member/LoginPage";
import TermsPage from "../pages/member/TermsPage";
import RegisterPage from "../pages/member/RegisterPage";
import ProjectListPage from "pages/project/ProjectListPage";
import KanbanPage from "pages/project/KanbanPage";

import List from "pages/article/List";
import Modify from "pages/article/Modify";
import Register from "pages/article/Register";
import View from "pages/article/View";
import BoardWrite from "pages/article/Register";

import NewPage from "pages/newPage/NewPage";
import Chatpage from "pages/chat/ChatPage";
import Calendar from "pages/calendar/Calendar";
import Cs from "pages/cs/CsPage";
import WritePage from "pages/cs/WritePage";
import FindIdPage from "pages/member/FindIdPage";
import FindPwPage from "pages/member/FindPwPage";

// 라우터 생성
const root = createBrowserRouter([
  // main
  {
    path: "/main",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <MainPage />
      </AuthRoute>
    ),
  },

  // chat
  {
    path: "/chatroom/:uid",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <Chatpage />
      </AuthRoute>
    ),
  },

  // admin
  {
    path: "/admin",
    element: (
      <AuthRoute allowedRoles={["ADMIN"]}>
        <AdminPage />
      </AuthRoute>
    ),
  },
  {
    path: "/admin/member/plan",
    element: (
      <AuthRoute allowedRoles={[ "ADMIN"]}>
        <AdminMemberPlan />
      </AuthRoute>
    ),
  },
  {
    path: "/admin/member/list",
    element: (
      <AuthRoute allowedRoles={[ "ADMIN"]}>
        <AdminMemberList />
      </AuthRoute>
    ),
  },
  {
    path: "/admin/article",
    element: (
      <AuthRoute allowedRoles={[ "ADMIN"]}>
        <AdminArticleList />
      </AuthRoute>
    ),
  },
  {
    path: "/admin/article/:ano",
    element: (
      <AuthRoute allowedRoles={[ "ADMIN"]}>
        <AdminArticleView />
      </AuthRoute>
    ),
  },
  {
    path: "/admin/article/view/answer",
    element: (
      <AuthRoute allowedRoles={["ADMIN"]}>
        <AdminArticleAnswer />
      </AuthRoute>
    ),
  },
  {
    path: "/admin/cs",
    element: (
      <AuthRoute allowedRoles={["ADMIN"]}>
        <AdminCsListPage />
      </AuthRoute>
    ),
  },
  {
    path: "/admin/question",
    element: (
      <AuthRoute allowedRoles={["ADMIN"]}>
        <AdminQuestionPage />
      </AuthRoute>
    ),
  },

  // member
  { path: "/", element: <LoginPage /> },
  { path: "/member/register", element: <RegisterPage /> },
  { path: "/member/terms", element: <TermsPage /> },
  { path: "/member/findid", element: <FindIdPage /> },
  { path: "/member/findpw", element: <FindPwPage /> },
  { path: "/oauth/callback/kakao", element: <KakaoRedirectPage /> },
  {
    path: "/member/logout",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <Navigate replace to="/" />
      </AuthRoute>
    ),
  },
  {
    path: "/member/passcheck",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <CheckPassPage />
      </AuthRoute>
    ),
  },
  {
    path: "/member/profile",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <ProfileUpdatePage />
      </AuthRoute>
    ),
  },
  {
    path: "/member/subscribe",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <SubscribePage />
      </AuthRoute>
    ),
  },
  // {
  //   path: "/oauth/callback/kakao",
  //   element: (
  //     <AuthRoute allowedRoles={["USER", "ADMIN"]}>
  //       <KakaoRedirectPage />
  //     </AuthRoute>
  //   ),
  // },
  
  // project
  {
    path: "/project/list",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <ProjectListPage />
      </AuthRoute>
    ),
  },
  {
    path: "/project/kanban",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <KanbanPage />
      </AuthRoute>
    ),
  },

  // article
  {
    path: "/article/list",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <List />
      </AuthRoute>
    ),
  },
  {
    path: "/article/modify/:ano",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <Modify />
      </AuthRoute>
    ),
  },
  {
    path: "/article/register",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <Register />
      </AuthRoute>
    ),
  },
  {
    path: "/article/view/:ano",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <View />
      </AuthRoute>
    ),
  },
  {
    path: "/article/write",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <BoardWrite />
      </AuthRoute>
    ),
  },

  // newPage
  {
    path: "/page/:pageNo",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <NewPage />
      </AuthRoute>
    ),
  },

  // chat
  {
    path: "/chat",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <Chatpage />
      </AuthRoute>
    ),
  },

  // calendar
  {
    path: "/calendar",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <Calendar />
      </AuthRoute>
    ),
  },

  // cs
  {
    path: "/cs",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <Cs />
      </AuthRoute>
    ),
  },
  {
    path: "/write",
    element: (
      <AuthRoute allowedRoles={["USER", "ADMIN"]}>
        <WritePage />
      </AuthRoute>
    ),
  },
]);

// 라우터 내보내기
export default root;
