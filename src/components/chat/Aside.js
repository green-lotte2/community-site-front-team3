import React from "react";
import { Link } from "react-router-dom";

const Aside = ({ chatRooms = [], onaddChatRoom }) => {
  return (
    <aside className="chatAside">
      <ul>
        {chatRooms.map((room, index) => (
          <li key={index}>
            <Link to={`/chat/${room.id}`}>{room.name}</Link>
          </li>
        ))}

        <Link to={"/"}>첫화면</Link>

        <li>
          <button onClick={onaddChatRoom}> + 채팅방 추가하기</button>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
