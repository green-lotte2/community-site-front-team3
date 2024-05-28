import React, { useState, useEffect } from "react";
import ChatLayout from "../../layouts/ChatLayout";
import Chat from "components/chat/Chat";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const ChatPage = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.username;
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoomName, setNewRoomName] = useState("");

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("/api/chatrooms");
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchChatRooms();
  }, []);

  useEffect(() => {
    const socket = new SockJS(`${url}/ws/chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected");

      client.subscribe("/topic/public", (message) => {
        const msg = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      client.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify({ uid }),
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [uid]);

  const handleSendMessage = (text) => {
    if (stompClient && stompClient.connected) {
      const chatMessage = {
        uid: uid,
        message: text,
      };
      console.log("chatMessage : " + JSON.stringify(chatMessage));
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
    }
  };

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post("/api/chatrooms", {
        title: newRoomName,
        status: "active",
      });
      setChatRooms([...chatRooms, response.data]);
      setNewRoomName("");
    } catch (error) {
      console.error("Error creating chat room", error);
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    // Load messages for the selected room (implement this part)
  };

  return (
    <ChatLayout>
      <div>
        <h1>Chat Rooms</h1>
        <ul>
          {chatRooms.map((room) => (
            <li key={room.chatNo} onClick={() => handleSelectRoom(room)}>
              {room.title}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="New room name"
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
      {selectedRoom && (
        <div>
          <h2>Selected Room: {selectedRoom.title}</h2>
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            uid={uid}
          />
        </div>
      )}
    </ChatLayout>
  );
};

export default ChatPage;
