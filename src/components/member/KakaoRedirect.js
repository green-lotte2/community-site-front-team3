import React from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLoginAction } from './kakaoLogin';

const KakaoRedirect = () => {
    const dispatch = useDispatch();

    // 인가 코드
    let code = new URL(window.location.href).searchParams.get('code');

    React.useEffect(() => {
        console.log('code11111', code);
        const fetchData = async () => {
            await dispatch(kakaoLoginAction(code));
        };

        fetchData();
    }, [dispatch, code]);

    return <div>KakaoRedirect</div>;
};

export default KakaoRedirect;
