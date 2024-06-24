import axios from 'axios';
import { globalPath } from 'globalPaths';
import { login } from 'slices/authSlice';

const serverHost = globalPath.serverHost;
const path = globalPath.path;
//const serverHost = '3.34.204.24';

const kakaoLogin = (code) => {
    return function (dispatch) {
        console.log('code 들어오나?', code);
        // 카카오에서 받은 인가코드 백엔드에 넘기고 토큰 받기
        axios({
            method: 'GET',
            url: `http://3.34.204.24:8080/oauth/callback/kakao?code=${code}`,
            withCredentials: true,
        })
            .then((res) => {
                console.log('token 들어오나?', JSON.stringify(res));

                // 받아온 토큰
                const ACCESS_TOKEN = res.data.a;

                console.log('accessToken:', ACCESS_TOKEN);
                // 받아온 토큰을 로컬에 저장
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