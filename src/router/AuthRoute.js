// src/router/AuthRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 라우터에 적용하여 로그인 여부와 권한 확인해서 접근 제한하는 함수

const AuthRoute = ({ allowedRoles, children  }) => {
  const { accessToken, userRole }  = useSelector((state) => state.loginSlice);

  // 토큰이 없을 때
  if (!accessToken) {
    alert("로그인 후 이용 가능합니다.");
    return <Navigate to="/" />;
  }

  // 권한이 없을 때
  if (!allowedRoles.includes(userRole)) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/main" />;
  }

  return children;
};

export default AuthRoute;