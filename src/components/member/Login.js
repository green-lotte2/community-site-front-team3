import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginButton, LoginButtonContainer } from '../styles/CustomButton';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from 'slices/authSlice';
import { globalPath } from 'globalPaths';
import { LOGIN_PATH } from 'requestPath';
import { useSelector } from 'react-redux';
const serverHost = globalPath.serverHost;
//const serverHost = '3.34.204.24';

const Login = () => {
    const REST_API_KEY = '8412b8200aef151b8d5e19641b967e1b';
    const REDIRECT_URI = `http://3.34.204.24/oauth/callback/kakao`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const kakaoLogin = (e) => {
        e.preventDefault();
        window.location.href = KAKAO_AUTH_URL;
        console.log('kakao요청 갔찌 ? :');
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        uid: '',
        pass: '',
    });
    const [passwordType, setPasswordType] = useState('password');
    const [passwordButtonIcon, setPasswordButtonIcon] = useState('eye-light-off-icon');
    const [error, setError] = useState('');

    const authSlice = useSelector((state) => state.authSlice);
    if (authSlice.uid) {
        window.location.href = '/main';
    }
    /** 로그인 버튼 클릭 */
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('여기야 설마??');
        axios
            .post(LOGIN_PATH, user)
            .then((resp) => {
                console.log(resp.data);
                // 리덕스 액션 실행 : 로그인 성공 시 사용자 정보를 리덕스 상태에 저장
                dispatch(login(resp.data));
                // 메인 전환
                navigate('/main');
                alert('로그인에 성공하셨습니다');
            })
            .catch((err) => {
                console.log(err);
                setError('아이디 또는 비밀번호가 틀렸습니다. 다시 확인해주세요.');
            });
    };

    /** 값 입력  */
    const changeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    /** 비밀번호 show */
    const onPasswordButtonClickHandler = () => {
        if (passwordType === 'text') {
            setPasswordType('password');
            setPasswordButtonIcon('eye-light-off-icon');
        } else {
            setPasswordType('text');
            setPasswordButtonIcon('eye-light-on-icon');
        }
    };

    return (
        <>
            <div className="container">
                <div className="login-container">
                    <div className="login-image"></div>
                    <div className="login-form">
                        <form onSubmit={submitHandler} className="login-form-submit">
                            <label htmlFor="uid">아이디</label>
                            <input
                                type="text"
                                name="uid"
                                placeholder="아이디를 입력하세요."
                                value={user.uid}
                                onChange={changeHandler}
                            />
                            <label htmlFor="pass">비밀번호</label>
                            <div className="password-container">
                                <input
                                    type={passwordType}
                                    name="pass"
                                    placeholder="비밀번호를 입력하세요."
                                    value={user.pass}
                                    onChange={changeHandler}
                                />
                                <button
                                    type="button"
                                    onClick={onPasswordButtonClickHandler}
                                    className={`password-toggle-button ${passwordButtonIcon}`}
                                >
                                    {passwordType === 'password' ? 'Show' : 'Hide'}
                                </button>
                            </div>
                            {error && <div className="login-errMsg">{error}</div>}
                            <div className="additional-options">
                                <Link to="/member/findid">아이디 찾기</Link> |
                                <Link to="/member/findpw"> 비밀번호 찾기</Link>
                            </div>
                            <LoginButtonContainer>
                                <LoginButton type="submit">로그인</LoginButton>
                            </LoginButtonContainer>
                            <div className="login-buttons">
                                <button className="kakao-login" onClick={(e) => kakaoLogin(e)}></button>
                                <button className="google-login"></button>
                            </div>
                            <div className="login-description-box">
                                <div className="login-description">
                                    {'신규 사용자이신가요? '}
                                    <span>
                                        <Link to={`${globalPath.terms}`}>{'회원가입'}</Link>
                                    </span>
                                </div>
                            </div>
                            <div className="login-test-user">
                                <div className="test-user-title">!!! 테스트 계정 입니다 !!! : </div>
                                <div className="test-user-id"> id: test0</div>
                                <div className="test-user-pass"> pass: qwer1234!</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
