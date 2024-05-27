<<<<<<< HEAD
import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Link, useParams } from "react-router-dom";

const Chat = ({ messages, onSendMessage, uid }) => {
  const { roomId } = useParams();

  return (
    <div className="chat-layout-container">
      <div className="chat-container">
        <h2>Chat Room {roomId}</h2>
        <div className="tabs">
          <Link to="#" className="active">
            Overview
          </Link>
          <Link to="#">Tasks</Link>
          <Link to="#">Documents</Link>
          <Link to="#">Team</Link>
          <Link to="#">Reports</Link>
          <Link to="#">Admin</Link>
        </div>
        <div className="messages-wrapper">
          <div className="messages">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                position={message.uid === uid ? "right" : "left"}
                text={message.message}
              />
            ))}
          </div>
        </div>
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
=======
import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Link } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useSelector } from 'react-redux';

const Chat = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const uid = authSlice.username;
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    console.log('Chat uid : ' + uid);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws/chat');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            console.log('Connected');

            client.subscribe('/topic/public', (message) => {
                const msg = JSON.parse(message.body);
                console.log('Received message:', msg);
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            client.send('/app/chat.addUser', {}, JSON.stringify({ uid }));
        };

        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
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
            console.log('chatMessage : ' + JSON.stringify(chatMessage));
            stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage),
            });
        }
    };

    return (
        <div className="chat-layout-container">
            <div className="chat-container">
                <h2>Chat</h2>
                <div className="tabs">
                    <Link to="#" className="active">
                        Overview
                    </Link>
                    <Link to="#">Tasks</Link>
                    <Link to="#">Documents</Link>
                    <Link to="#">Team</Link>
                    <Link to="#">Reports</Link>
                    <Link to="#">Admin</Link>
                </div>
                <div className="messages-wrapper">
                    <div className="messages">
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                position={message.uid === uid ? 'right' : 'left'} // 변경된 부분
                                text={message.message}
                            />
                        ))}
                    </div>
                </div>
                <ChatInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
>>>>>>> 304e3084e4cd7347791b4050bb20352f34baea4c
};

export default Chat;
