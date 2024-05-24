import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    uid: "",
    pass: "",
    pass2: "",
    name: "",
    nick: "",
    email: "",
    hp: "",
    grade: "BASIC",
    role: "USER",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(user);

    // 아이디 유효성 검사
    const uidPattern = /^[a-zA-Z0-9_]{4,20}$/;
    if (!uidPattern.test(user.uid)) {
      alert("아이디는 영문자와 숫자로 4자 이상, 20자 이하여야 합니다.");
      return;
    }

    const passPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passPattern.test(user.pass)) {
      alert("비밀번호는 영문자와 숫자를 포함하여 8자 이상이어야 합니다.");
      console.log(user.pass);
      return;
    }
    if (user.pass !== user.pass2) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!user.name) {
      alert("이름은 필수입력 사항입니다.");
      return;
    }

    if (!user.nick) {
      alert("별명은 필수입력 사항입니다.");
      return;
    }
    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailPattern.test(user.email)) {
      alert("올바른 이메일 주소를 입력해주세요.");
      return;
    }
    const hpPattern = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!hpPattern.test(user.hp)) {
      alert("올바른 휴대폰번호 형식을 입력해주세요.");
      return;
    }
    axios
      .post("http://localhost:8080/user", user)
      .then((response) => {
        console.log(response.data);
        alert("회원가입 완료!");

        navigate("/member/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <div className="signup-container">
          <div className="signup-Form">
            <form onSubmit={submitHandler}>
              <label htmlFor="uid">아이디</label>
              <input
                type="text"
                name="uid"
                placeholder="Enter your ID"
                onChange={changeHandler}
                value={user.uid}
              />

              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="pass"
                placeholder="Enter your PW"
                value={user.pass}
                onChange={changeHandler}
              />

              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input
                type="password"
                name="pass2"
                placeholder="Check your PW"
                onChange={changeHandler}
              />

              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={changeHandler}
              />

              <label htmlFor="nick">별명</label>
              <input
                type="text"
                name="nick"
                placeholder="Enter your nick"
                value={user.nick}
                onChange={changeHandler}
              />
              <label htmlFor="hp">휴대폰번호</label>
              <input
                type="text"
                name="hp"
                placeholder="Enter your HP"
                value={user.hp}
                onChange={changeHandler}
              />
              <label htmlFor="email">이메일</label>
              <div className="email-input-container">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={changeHandler}
                />
                <button className="email-verify" type="button">
                  이메일 인증
                </button>
              </div>

              <button type="submit">회원가입</button>
            </form>
            <div className="signup-options">
              <div className="signup-buttons">
                <button className="kakao-signup">카카오</button>
                <button className="google-signup">구글</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
