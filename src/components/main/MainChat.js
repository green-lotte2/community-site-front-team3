import ChatRoomList from '../chat/ChatRoomList';
import { AuthProvider, useAuth } from 'api/ContextApi';
import React, { useEffect, useState } from 'react';
import { globalPath } from 'globalPaths';
import axios from 'axios';
import { useSelector } from 'react-redux';

const path = globalPath.path;

const MainChatList = () => {
    const { user } = useAuth();
    const [chatRooms, setChatRooms] = useState([]);
    const authSlice = useSelector((state) => state.authSlice);

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

    return (
        <div>
            <h3>내가 참여한 채팅방</h3>
            {chatRooms.length > 0 ? (
                chatRooms.map((chatRoom, index) => <div key={index}>{chatRoom.title}</div>)
            ) : (
                <p>로그인이 필요합니다. </p>
            )}
        </div>
    );
};

const MainChat = () => (
    <AuthProvider>
        <MainChatList />
    </AuthProvider>
);

export default MainChat;
