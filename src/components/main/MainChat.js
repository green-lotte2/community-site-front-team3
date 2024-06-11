import ChatRoomList from '../chat/ChatRoomList';
import { AuthProvider, useAuth } from 'api/ContextApi';
import React, { useEffect, useState } from 'react';
import { globalPath } from 'globalPaths';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

const path = globalPath.path;

const MainChatList = (setChatRoom) => {
    const { user } = useAuth();
    const [chatRooms, setChatRooms] = useState([]);
    const authSlice = useSelector((state) => state.authSlice);
    const [selectedRoom, setSelectedRoomState] = useState(null);

    useEffect(() => {
        console.error('user : ', user);
        const fetchChatRooms = async () => {
            try {
                const response = await axios.get(`${path}/user/${authSlice.uid}`);
                setChatRooms(response.data);
                console.error('채팅 불러옴 chatRooms : ', response.data);
            } catch (error) {
                console.error('Error fetching chat rooms', error);
            }
        };

        fetchChatRooms();
        console.error('채팅 불러옴 chatRooms : ', chatRooms);
    }, [authSlice]);

    const handleSelectRoom = (chatRoom) => {
        setSelectedRoomState(chatRoom);
        setChatRoom(chatRoom);
    };
    return (
        <div>
            <h3>내가 참여한 채팅방</h3>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
                {chatRooms.length > 0 ? (
                    chatRooms.map((chatRoom, index) => (
                        <div key={index}>
                            <Link to={`/chatroom/${chatRoom.id}`} onClick={() => setChatRoom(chatRoom)}>
                                {chatRoom.title}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>로그인이 필요합니다. </p>
                )}
            </Card>
        </div>
    );
};

const MainChat = () => (
    <AuthProvider>
        <MainChatList />
    </AuthProvider>
);

export default MainChat;
