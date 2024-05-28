import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Aside = ({ chatRooms = [], onAddChatRoom }) => {
  const [newChatRoomTitle, setNewChatRoomTitle] = useState("");

  const handleAddChatRoom = async () => {
    if (newChatRoomTitle.trim() === "") return;

    try {
      const response = await axios.post("/api/chatrooms", newChatRoomTitle, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      onAddChatRoom(response.data);
      setNewChatRoomTitle("");
    } catch (error) {
      console.error("Error creating chat room", error);
    }
  };
  return (
    <aside className="chatAside">
      <ul>
        {chatRooms.map((room, index) => (
          <li key={index}>
            <Link to={`/chat/${room.id}`}>{room.name}</Link>
          </li>
        ))}

        <Link to={"/"}>처음으로</Link>

        <li>
          <input
            type="text"
            value={newChatRoomTitle}
            onChange={(e) => setNewChatRoomTitle(e.target.value)}
            placeholder="New Chat Room Title"
          />

          <button onClick={handleAddChatRoom}> + 채팅방 추가하기</button>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
