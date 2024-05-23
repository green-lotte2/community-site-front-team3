import React from 'react';
import Header from '../components/common/main/Header';
import Aside from '../components/chat/Aside';
import Footer from '../components/common/main/Footer';

const ChatLayout = ({ children }) => {
    return (
        <div id="chatContainer">
            <Header />
            <div className="chat-layout-container">
                <Aside />
                <main>
                    {children}
                </main>
            </div>
            <Footer />
        </div> 
        
    );
};

export default ChatLayout;
