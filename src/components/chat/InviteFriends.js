import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const InviteFriends = ({ chatNo }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [title, setTitle] = useState("");
  const uid = authSlice.uid;

  useEffect(() => {
    if (authSlice && authSlice.company) {
      fetchUsersByCompany(authSlice.company);
    }
  }, [authSlice]);

  useEffect(() => {
    fetchTitle();
  }, [uid]);

  const fetchTitle = async () => {
    const response = await axios.get(`${url}/user/${uid}`);
    setTitle(response.data[0].title);
  };

  /** 같은 회사인 유저 조회 */
  const fetchUsersByCompany = async (company) => {
    try {
      const response = await axios.get(`${url}/friends?company=${company}`);
      setUsers(response.data);
    } catch (error) {
      console.error("유저 조회 에러:", error);
    }
  };

  /** 친구 초대 back 전송 */
  const handleInvite = async () => {
    console.log("친구 초대 chatNo : ", chatNo);
    try {
      await axios.post(`${url}/chatroom/invite`, {
        chatNo: chatNo,
        uid: selectedFriend,
      });
      alert("친구 초대 성공");
      // 초대된 친구 목록 갱신
      setInvitedUsers([
        ...invitedUsers,
        users.find((user) => user.uid === selectedFriend).name,
      ]);
      setSelectedFriend(""); // 초대 후 선택 초기화
    } catch (error) {
      console.error("친구 초대 실패", error);
      alert("친구 초대 실패");
    }
  };

  const handleInviteUser = (e) => {
    setSelectedFriend(e.target.value);
  };

  /** 이미 초대된 유저 제외 */
  const getFilteredUsers = () => {
    return users.filter((user) => !invitedUsers.includes(user.name));
  };

  return (
    <div className="invite-friends">
      <select value={selectedFriend} onChange={handleInviteUser}>
        <option value="" disabled>
          친구 선택
        </option>
        {getFilteredUsers().map((user, index) => (
          <option key={index} value={user.uid}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleInvite} disabled={!selectedFriend}>
        친구 초대
      </button>
    </div>
  );
};

export default InviteFriends;
