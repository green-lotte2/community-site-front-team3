import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { globalPath } from 'globalPaths';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login, updateUserProfile } from 'slices/authSlice';

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

    useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
            if (location.state.user.profile) {
                setUserProfilePreview(`${globalPath.path}/prodImg/${location.state.user.profile}`);
            }
        }
    }, [location.state]);

    useEffect(() => {
        if (user.profile) {
            setUserProfilePreview(`${globalPath.path}/prodImg/${user.profile}`);
        }
    }, [user.profile]);

    /** 계정 설정 - 사용자 정보 넘겨줌 */
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/user/info?uid=${authSlice.uid}`);
                setUser(response.data);
                console.log('check1111:', response.data);
            } catch (error) {
                console.error('사용자 정보 받기 에러:', error);
            }
        };

        if (authSlice.uid) {
            fetchUserData();
        }
    }, [url]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFileChange = (acceptedFiles) => {
        const selectedProfile = acceptedFiles[0];
        setUserProfile(selectedProfile);
        const preview = URL.createObjectURL(selectedProfile);
        setUserProfilePreview(preview);
    };

    const submitHandler = (e) => {
        e.preventDefault();
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

        axios
            .patch(`${globalPath.path}/user/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                // 사용자 정보 업데이트
                dispatch(updateUserProfile(response.data));

                alert('수정 완료!');
                navigate('/main');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const passCheckBox = () => {
        setCheckBox(!checkBox);
        console.log(checkBox);
    }

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
