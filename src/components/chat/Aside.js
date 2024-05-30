import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const Aside = ({ setSelectedRoom, uid }) => {
  const [newChatRoomTitle, setNewChatRoomTitle] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${url}/chatroom/user/${uid}`);
        setChatRooms([...chatRooms, response.data]);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchChatRooms();
  }, [uid]);

  const handleDeleteRoom = async (chatNo) => {
    try {
      await axios.delete(`chatroom/${chatNo}`);
      setChatRooms(chatRooms.filter((room) => room.chatNo !== chatNo));
    } catch (error) {
      console.error("Error deleting chat room", error);
    }
  };

  const handleAddChatRoom = async () => {
    if (newChatRoomTitle.trim() === "") return;

    try {
      const response = await axios.post(
        "/chatroom",
        { title: newChatRoomTitle, status: "active", uid: uid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNewChatRoomTitle("");
      setChatRooms([...chatRooms, response.data]);
    } catch (error) {
      console.error("Error creating chat room", error);
    }
  };

  return (
    <aside className="chatAside">
      <ul>
        <Link to="/main">처음으로</Link>
        {chatRooms.length === 0 ? (
          <li>메세지 없음</li>
        ) : (
          chatRooms.map((room, index) => (
            <li key={index}>
              <Link to="#" onClick={() => setSelectedRoom(room)}>
                {room.title}
              </Link>
              <button onClick={() => handleDeleteRoom(room.chatNo)}>삭제</button>
            </li>
          ))
        )}
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
