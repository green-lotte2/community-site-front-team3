import React, { createContext, useContext, useState } from 'react';

// 로그인 정보 저장 Api
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (uid) => {
        setUser({ uid });
        localStorage.setItem('uid', uid); // 로컬 스토리지에 저장
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('uid'); // 로그아웃시 로컬 스토리지에서 삭제
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('로그인 정보 못 가져오나?');
    }
    return context;
};
