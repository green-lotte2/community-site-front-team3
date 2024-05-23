import React, {useState, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput'

const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/api/messages')
            .then(response => {setMessages(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    const handleSendMessage = (text) => {
        const newMessage = { position: 'right', text};
        setMessages([...messages, newMessage]);

        axios.post('/api/messages', newMessage)
        .then(response => {
            console.log("Message sent successfully:", response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="chat-layout-container">
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
                    {messages.map((message, index) => (
                        <ChatMessage key={index} position={message.position} text={message.text} />
                    ))}
                </div>
                <ChatInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};
export default Chat;
