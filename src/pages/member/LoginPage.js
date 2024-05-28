import React from 'react';
import MemberLayout from 'layouts/MemberLayout';
import Login from 'components/member/Login';
import { appVersion } from 'appVersion';
const LoginPage = () => {
    const version = appVersion.version;
    return (
        <>
        <MemberLayout>
            <Login />
        </MemberLayout>
        <div className='appVersion'>{version}</div>
        </>
    );
};

export default LoginPage;
