import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { globalPath } from 'globalPaths';
import { MAIN_PATH } from 'requestPath';
import Dropzone from 'react-dropzone';
import authSlice from 'slices/authSlice';
import { useSelector } from 'react-redux';

const ProfileUpdate = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        uid: '',
        nick: '',
        password: '',
        email: '',
        hp: '',
        company: '',
        department: '',
        position: '',
    });
    const [profilePreviewImg, setProfilePreviewImg] = useState(null);

    useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    // 사진
    const [userProfile, setUserProfile] = useState(null);
    const [userProfilePreview, setUserProfilePreview] = useState(null);

    /** 프사 바꾸면  */
    const handleFileChange = (acceptedFiles) => {
        const selectProfile = acceptedFiles[0];
        console.log('@@##');
        console.log(selectProfile);

        setUserProfile(selectProfile);
        const preview = URL.createObjectURL(selectProfile);
        setUserProfilePreview(preview);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append each field of the user object individually
        formData.append('nick', user.nick);
        formData.append('uid', authSlice.uid);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('hp', user.hp);
        formData.append('company', user.company);
        formData.append('department', user.department);
        formData.append('position', user.position);

        // Append the file
        if (userProfile) {
            formData.append('file', userProfile);
        }

        console.log('formData : ', formData);

        axios
            .post(`${globalPath.path}/user/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data);
                alert('완료!');

                //navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
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
                                        <input {...getInputProps()} />
                                        {profilePreviewImg ? (
                                            <img
                                                className="profile-picture-preview"
                                                src={profilePreviewImg}
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
                        <label htmlFor="password">비밀번호 변경</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="새로운 비밀번호를 입력하세요."
                            onChange={handleChange}
                            value={user.password}
                        />
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
