import React, { useState, useEffect } from "react";
import ChatLayout from "../../layouts/ChatLayout";
import Chat from "components/chat/Chat";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import axios from "axios";
import { globalPath } from "globalPaths";
import Aside from "components/chat/Aside";

const url = globalPath.path;

const ChatPage = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.username;
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("/api/chatroom");
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
        chatNo: selectedRoom?.chatNo,
      };
      console.log("chatMessage : " + JSON.stringify(chatMessage));
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
    }
  };

  const handleAddChatRoom = (newRoom) => {
    setChatRooms((prevRooms) => [...prevRooms, newRoom]);
  };

  const handleSelectChatRoom = (room) => {
    setSelectedRoom(room);
    // 해당 채팅방의 메시지를 불러오는 로직을 추가할 수 있습니다.
  };

  const handleDeleteRoom = async (chatNo) => {
    try {
      await axios.delete(`/api/chatroom/${chatNo}`);
      setChatRooms(chatRooms.filter((room) => room.chatNo !== chatNo));
    } catch (error) {
      console.error("Error deleting chat room", error);
    }
  };

  return (
    <div className="chat-layout-container">
      <Aside
        chatRooms={chatRooms}
        onAddChatRoom={handleAddChatRoom}
        onDeleteChatRoom={handleDeleteRoom}
        onSelectChatRoom={handleSelectChatRoom}
      />
      <ChatLayout>
        <Chat messages={messages} onSendMessage={handleSendMessage} uid={uid} />
      </ChatLayout>
    </div>
  );
};

export default ChatPage;
