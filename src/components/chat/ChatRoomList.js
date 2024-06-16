import axios from "axios";
import React, { useEffect, useState } from "react";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const ChatRoomList = ({ uid }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${url}/user/chatrooms/${uid}`);
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchChatRooms();
  }, [uid]);

  return (
    <ul>
      {chatRooms.map((room) => (
        <li key={room.chatNo}>{room.title}</li>
      ))}
    </ul>
  );
};

export default ChatRoomList;
