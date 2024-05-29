import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatRoom from "./ChatRoom";

const Aside = ({ setSelectedRoom }) => {
  const [newChatRoomTitle, setNewChatRoomTitle] = useState("");
  const [roomName, setRoomName] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  /** 채팅방 리스트 조회 */
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("/api/chatrooms");
        setChatRooms(response.data);
        console.log("채팅방 : " + response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchChatRooms();
  }, []);

  /** 채팅방 삭제 */
  const handleDeleteRoom = async (chatNo) => {
    try {
      await axios.delete(`/api/chatroom/${chatNo}`);
      setChatRooms(chatRooms.filter((room) => room.chatNo !== chatNo));
    } catch (error) {
      console.error("Error deleting chat room", error);
    }
  };

  /** 채팅방 추가 */
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
      setNewChatRoomTitle("");
      setRoomName(newChatRoomTitle);
      // 채팅방 리스트 업데이트
      setChatRooms([...chatRooms, response.data]);
    } catch (error) {
      console.error("Error creating chat room", error);
    }
  };

  return (
    <aside className="chatAside">
      <ul>
        {chatRooms.map((room, index) => (
          <li key={index}>
            <Link to="#" onClick={() => setSelectedRoom(room)}>
              {room.title}
            </Link>
            <button onClick={() => handleDeleteRoom(room.chatNo)}>삭제</button>
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
      <ChatRoom roomName={roomName} />
    </aside>
  );
};

export default Aside;
