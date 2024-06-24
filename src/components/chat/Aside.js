import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { globalPath } from "globalPaths";
import { useSelector } from "react-redux";

const url = globalPath.path;

const Aside = ({ setSelectedRoom }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.uid;
  const [newChatRoomTitle, setNewChatRoomTitle] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoomState] = useState(null);
  const [isFreeUser, setIsFreeUser] = useState(false);

  useEffect(() => {
    const fetchUserGrade = async () => {
      try {
        const response = await axios.get(`${url}/user/grade/${uid}`);
        setIsFreeUser(response.data === "FREE");
        console.log("Response.data", response.data);
      } catch (error) {
        console.error("Error fetching user grade", error);
      }
    };

    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${url}/user/${uid}`);
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchUserGrade();
    fetchChatRooms();
  }, [uid]);

  const handleDeleteRoom = async (chatNo) => {
    await axios
      .delete(`${url}/chatroom`, {
        params: {
          uid: uid,
          chatNo: chatNo,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setChatRooms(chatRooms.filter((room) => room.chatNo !== chatNo));
  };

  const handleAddChatRoom = async () => {
    if (!newChatRoomTitle.trim()) {
      alert("방 제목을 설정해주세요");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/chatroom/${uid}`,
        { title: newChatRoomTitle, status: "active" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNewChatRoomTitle("");
      setChatRooms([...chatRooms, response.data]);
      setSelectedRoomState(response.data);
    } catch (error) {
      console.error("Error creating chat room", error);
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRoomState(room);
    setSelectedRoom(room);
  };

  return (
    <aside className="chatAside">
      <ul>
        <li>
          <div class="logo">
            <Link to={globalPath.mainPath}>
              <img
                className="chatLogo"
                src="/images/logo/logo13.png"
                alt="aa"
                style={{ width: "140px" }}
              />
            </Link>
          </div>
        </li>
        <li>
          <div>채팅방을 선택해 주세요</div>
        </li>
        {chatRooms.length === 0 ? (
          <li>참여중인 채팅방 없음</li>
        ) : (
          chatRooms.map((room, index) => (
            <li key={index}>
              <Link to="#" onClick={() => handleSelectRoom(room)}>
                {room.title}
              </Link>
              <button onClick={() => handleDeleteRoom(room.chatNo)}>
                나가기
              </button>
            </li>
          ))
        )}
        {!isFreeUser && (
          <li>
            <input
              type="text"
              value={newChatRoomTitle}
              onChange={(e) => setNewChatRoomTitle(e.target.value)}
              placeholder="채팅방 생성하기"
            />
            <button onClick={handleAddChatRoom} className="btnChatPlus">
              {" "}
              +{" "}
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Aside;
