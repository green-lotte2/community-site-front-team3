import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { globalPath } from 'globalPaths';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from 'slices/authSlice';
import { fetchUserData, updateUser } from 'api/UserApi';

const ProfileUpdate = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = globalPath.path;
    const [checkBox, setCheckBox] = useState(false);

    const [user, setUser] = useState({
        uid: '',
        pass: '',
        nick: '',
        email: '',
        hp: '',
        company: '',
        department: '',
        position: '',
        profile: '',
    });

    const [userProfile, setUserProfile] = useState(null);
    const [userProfilePreview, setUserProfilePreview] = useState('');

    // 페이지 라우팅시 프로필 사진 미리보기 변경
    useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
            if (location.state.user.profile) {
                setUserProfilePreview(`${globalPath.path}/prodImg/${location.state.user.profile}`);
            }
        }
    }, [location.state]);
    
    // 프로필 사진 선택했을때 미리보기 변경
    useEffect(() => {
        if (user.profile) {
            setUserProfilePreview(`${globalPath.path}/prodImg/${user.profile}`);
        }
    }, [user.profile]);

    /** 계정 설정 - 사용자 정보 넘겨줌 */
    useEffect(() => {
        if (authSlice.uid) {
            fetchUserData(url, authSlice.uid)
                 .then(data => {
                    setUser(data);
                       console.log('check1111:', data);
                 })
                 .catch(error => {
                     console.error('사용자 정보 받기 에러:', error);
                 });
        }
     }, [url, authSlice.uid]);

    // value 값 입력
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // 파일 형식 검사 및 업로드
    const handleFileChange = (acceptedFiles) => {
        const allowedExtensions = ['.jpg', '.gif', '.png', '.jpeg', '.bmp'];

        // 파일 확장자 확인
        const selectedProfile = acceptedFiles[0];
        const fileExtension = selectedProfile.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes('.' + fileExtension)) {
            alert('허용되지 않는 파일 형식입니다.');
            return;
        }

        // 허용된 파일인 경우 처리
        setUserProfile(selectedProfile);
        const preview = URL.createObjectURL(selectedProfile);
        setUserProfilePreview(preview);
    };

    // 회원정보 수정 핸들러
    const submitHandler = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('회원정보 수정을 하시겠습니까?');

        if (confirmed) {
            const formData = new FormData();
            formData.append('uid', authSlice.uid);
            formData.append('pass', user.pass);
            formData.append('nick', user.nick);
            formData.append('email', user.email);
            formData.append('hp', user.hp);
            formData.append('company', user.company);
            formData.append('department', user.department);
            formData.append('position', user.position);

            if (userProfile) {
                formData.append('file', userProfile);
            }

            updateUser(formData)
                .then(data => {
                    dispatch(updateUserProfile(data));
                    alert('수정 완료!');
                    navigate('/main');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
    // 비밀번호 수정 체크박스
    const passCheckBox = () => {
        setCheckBox(!checkBox);
        if (!checkBox) {
            setUser((prevUser) => ({
                ...prevUser,
            }));
        }
        console.log(checkBox);
    };
    return (
        <div className="container">
            <div className="profile-update-container">
                <div className="profile-update-form">
                    <form onSubmit={submitHandler}>
                        <div className="profile-picture-container">
                            <Dropzone onDrop={handleFileChange}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input accept=".jpg, .gif, .png, .jpeg, .bmp" {...getInputProps()} />
                                        {userProfilePreview ? (
                                            <img
                                                className="profile-picture-preview"
                                                src={userProfilePreview}
                                                alt="프로필 사진"
                                            />
                                        ) : (
                                            <img
                                                className="profile-picture-preview"
                                                src="/images/icon/user.png"
                                                alt="프로필 사진"
                                            />
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        <label htmlFor="nick">닉네임</label>
                        <input
                            type="text"
                            name="nick"
                            placeholder="닉네임을 입력하세요."
                            onChange={handleChange}
                            value={user.nick}
                        />
                        <label className="passLabel" htmlFor="pass">
                            비밀번호 변경 (선택)
                            <input className="passCheck" type="checkbox" checked={checkBox} onChange={passCheckBox} />
                        </label>
                        {checkBox && (
                            <input
                                type="password"
                                name="pass"
                                placeholder="새로운 비밀번호를 입력하세요."
                                onChange={handleChange}
                                value={user.pass}
                                required
                            />
                        )}
                        <label htmlFor="email">이메일 관리</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일을 입력하세요."
                            onChange={handleChange}
                            value={user.email}
                        />
                        <label htmlFor="hp">연락처</label>
                        <input
                            type="text"
                            name="hp"
                            placeholder="연락처를 입력하세요."
                            onChange={handleChange}
                            value={user.hp}
                        />
                        <label htmlFor="company">회사</label>
                        <input
                            type="text"
                            name="company"
                            placeholder="회사명을 입력하세요."
                            onChange={handleChange}
                            value={user.company}
                        />
                        <label htmlFor="department">부서</label>
                        <input
                            type="text"
                            name="department"
                            placeholder="부서명을 입력하세요."
                            onChange={handleChange}
                            value={user.department}
                        />
                        <label htmlFor="position">직급</label>
                        <input
                            type="text"
                            name="position"
                            placeholder="직급을 입력하세요."
                            onChange={handleChange}
                            value={user.position}
                        />
                        <button type="submit">저장</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
