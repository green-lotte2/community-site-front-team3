import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Aside = ({
  chatRooms = [],
  onAddChatRoom,
  onDeleteChatRoom,
  onSelectChatRoom,
}) => {
  const [newChatRoomTitle, setNewChatRoomTitle] = useState("");

  const handleAddChatRoom = async () => {
    if (newChatRoomTitle.trim() === "") return;

    try {
      const response = await axios.post(
        "/api/chatroom",
        { title: newChatRoomTitle, status: "active" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
            <Link
              to={`/chat/${room.chatNo}`}
              onClick={() => onSelectChatRoom(room)}
            >
              {room.title}
            </Link>
            <button onClick={() => onDeleteChatRoom(room.chatNo)}>삭제</button>
          </li>
        ))}
        <li>
          <input
            type="text"
            value={newChatRoomTitle}
            onChange={(e) => setNewChatRoomTitle(e.target.value)}
            placeholder="New Chat Room Title"
          />
          <button onClick={handleAddChatRoom} className="btnChatPlus">
            {" "}
            +{" "}
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
