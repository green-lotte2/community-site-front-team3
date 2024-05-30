import React, { useEffect, useState } from "react";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const InviteFriends = ({ chatNo, company }) => {
  const [friendId, setFriendId] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${url}/friends/${company}`);
        setFriendId(response.data);
      } catch (error) {
        console.error("Error fetching friends", error);
      }
    };

    fetchFriends();
  }, [company]);

  /** 친구 초대 */
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

  return (
    <div className="invite-friends">
      <select
        value={selectedFriend}
        onChange={(e) => setSelectedFriend(e.target.value)}
      >
        <option value="" disabled>
          친구 선택
        </option>
        {friendId.map((friend) => (
          <option key={friend.uid} value={friend.uid}>
            {friend.name}
          </option>
        ))}
      </select>
      <button onClick={handleInvite}>친구 초대</button>
    </div>
  );
};

export default InviteFriends;
