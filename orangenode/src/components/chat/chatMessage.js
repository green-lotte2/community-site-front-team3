import React from 'react';

const ChatMessage = ({position, text}) => {
    return (
            <div className={`chat-message ${position}`}>
                <div className='chat-user'><img src="avatar.png" alt="User" /></div>
                <div className='chat-text'>
                    <p>{text}</p>
                </div>
            </div>
    );
};
export default ChatMessage;