import React from 'react';
import ChatLayout from '../../layouts/ChatLayout';
import Chat from 'components/chat/Chat'
import '../../styles/chat/chat.scss';

const Chatpage = () => {
    return (
        <ChatLayout>
            <Chat />
        </ChatLayout>
    );
};

export default Chatpage;