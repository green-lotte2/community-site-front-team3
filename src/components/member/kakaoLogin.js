import axios from 'axios';
import { login } from 'slices/authSlice';

const kakaoLogin = (code) => {
    return function (dispatch) {
        axios({
            method: 'GET',
            url: `http://localhost:8080/oauth/callback/kakao?code=${code}`,
            withCredentials: true,
        })
            .then((res) => {
                console.log('token 들어오나?', JSON.stringify(res));

                const ACCESS_TOKEN = res.data;

                console.log('accessToken:', ACCESS_TOKEN);
                localStorage.setItem('token', ACCESS_TOKEN);
                console.log('local스토리지 체크111', localStorage.getItem('token'));
                alert('로그인 성공');
                dispatch(login(res.data));
                // 토큰 받고 로그인 성공 시 이동
                window.location.replace('/main');
            })
            .catch((err) => {
                console.error('소셜로그인 에러', err);
                window.alert('로그인에 실패하셨습니다.');
                window.location.replace('/');
            });
    };
};

export const kakaoLoginAction = (code) => {
    return async (dispatch, getState) => {
        await dispatch(kakaoLogin(code));
    };
};

export default kakaoLogin;
