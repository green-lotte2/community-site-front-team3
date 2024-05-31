import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const InviteFriends = ({ chatNo }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [userUids, setUserUids] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");

  useEffect(() => {
    if (authSlice && authSlice.company) {
      fetchUsersByCompany(authSlice.company);
    }
  }, [authSlice]);

  // 같은 회사인 유저 조회
  const fetchUsersByCompany = async (company) => {
    try {
      const response = await axios.get(`${url}/friends?company=${company}`);
      console.log("Response:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("프로젝트 조회 에러:", error);
    }
  };

  // 친구 초대
  const handleInvite = async () => {
    try {
      await axios.post(`${url}/chatroom/invite`, {
        chatNo: chatNo,
        uid: selectedFriend,
      });
      alert("친구 초대 성공");
    } catch (error) {
      console.error("친구 초대 실패", error);
      alert("친구 초대 실패");
    }
  };

  const handleInviteUser = (e) => {
    const selectdata = e.target.value.split("?");
    const selectedUser = selectdata[0];
    const selectUids = selectdata[1];

    if (selectedUser && !invitedUsers.includes(selectedUser)) {
      setInvitedUsers([...invitedUsers, selectedUser]);
    }
    if (selectUids && !userUids.includes(selectUids)) {
      setUserUids([...userUids, selectUids]);
    }

    setSelectedFriend(selectUids);
  };

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
          <option key={index} value={`${user.name}?${user.uid}`}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleInvite}>친구 초대</button>
    </div>
  );
};

export default InviteFriends;
