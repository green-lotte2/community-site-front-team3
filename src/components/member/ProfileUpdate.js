import React, { useState } from 'react';

const ProfileUpdate = () => {
  const [profile, setProfile] = useState({
    profilePicture: '',
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setProfile(prevState => ({
        ...prevState,
        profilePicture: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', profile);
  };

  return (
    <div className="container">
      <div className="profile-update-container">
        <div className="profile-update-form">
          <form onSubmit={handleSubmit}>
            <div className="profile-picture-container">
              {/* 프로필 사진 미리보기 */}
              <label htmlFor="profilePicture">
                <img className="profile-picture-preview" src={profile.profilePicture || "/images/icon/user.png"} alt="프로필 사진" />
              </label>
              {/* 프로필 사진 업로드 버튼 */}
              <input
                type="file"
                accept="image/*"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <label htmlFor="nick">닉네임</label>
            <input
              type="text"
              name="nick"
              placeholder="닉네임을 입력하세요."
              onChange={handleChange}
              value={profile.nick}
            />  
            <label htmlFor="password">비밀번호 변경하기</label>
            <input
              type="password"
              name="password"
              placeholder="새 비밀번호를 입력하세요."
              onChange={handleChange}
              value={profile.password}
            />
            <label htmlFor="email">이메일 관리</label>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력하세요."
              onChange={handleChange}
              value={profile.email}
            />
            <label htmlFor="company">회사</label>
            <input
              type="text"
              name="company"
              placeholder="회사명을 입력하세요."
              onChange={handleChange}
              value={profile.company}
            />
            <label htmlFor="department">부서</label>
            <input
              type="text"
              name="department"
              placeholder="부서명을 입력하세요."
              onChange={handleChange}
              value={profile.department}
            />
            <label htmlFor="position">직급</label>
            <input
              type="text"
              name="position"
              placeholder="직급을 입력하세요."
              onChange={handleChange}
              value={profile.position}
            />
            <button type="submit">저장</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
