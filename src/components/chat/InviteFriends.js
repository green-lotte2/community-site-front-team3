import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const InviteFriends = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [userUids, setUserUids] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [chatRoomNo, setChatRoomNo] = useState(null);
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

  useEffect(() => {
    if (title) {
      fetchChatRoomNo(title);
    }
  }, [title]);

  const fetchTitle = async () => {
    const response = await axios.get(`${url}/user/${uid}`);
    setTitle(response.data[0].title);
  };

  /** 같은 회사인 유저 조회 */
  const fetchUsersByCompany = async (company) => {
    try {
      const response = await axios.get(`${url}/friends?company=${company}`);
      console.log("Response:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("유저 조회 에러:", error);
    }
  };

  /** ChatRoomNo 가져오기 */
  const fetchChatRoomNo = async (title) => {
    try {
      const response = await axios.post(`${url}/chatRoom/getRoomNo`, { title });
      console.log("ChatRoomNo:", response.data);
      setChatRoomNo(response.data.chatNo);
    } catch (error) {
      console.error("ChatRoomNo 조회 에러:", error);
    }
  };

  /** 친구 초대 */
  const handleInvite = async () => {
    if (!chatRoomNo) {
      alert("Chat room not found");
      return;
    }
    try {
      await axios.post(`${url}/chatroom/invite`, {
        chatNo: chatRoomNo,
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
