import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput'

const Chat = () => {
    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <div class="tabs">
                <a href="#" class="active">Overview</a>
                <a href="#">Tasks</a>
                <a href="#">Documents</a>
                <a href="#">Team</a>
                <a href="#">Reports</a>
                <a href="#">Admin</a>
            </div>
            <div className='chat-container'>
                <ChatMessage position="left" text="How can we help? We’re here for you!" />
                <ChatMessage position="right" text="Hey John, I am looking for the best admin template. Could you please help me to find it out?" />
                <ChatMessage position="left" text="It should be MUI 5 compatible." />
                <ChatMessage position="right" text="Absolutely!" />
                <ChatMessage position="left" text="This admin template is built with MUI." />
            </div>
            <ChatInput />
        </div>
    );
};
export default Chat;
