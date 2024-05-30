// InviteFriends.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const InviteFriends = ({ chatRoomId }) => {
  const [friendId, setFriendId] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("/friends");
        setFriendId(response.data);
      } catch (error) {
        console.error("Error fetching friends", error);
      }
    };

    fetchFriends();
  }, []);

  const handleInvite = async () => {
    try {
      await axios.post(`${url}/chatroom/${chatRoomId}/invite`, {
        uid: selectedFriend,
      });
    } catch (error) {
      console.error("친구초대 실패ㅠ", error);
    }
  };

  return (
    <div>
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
