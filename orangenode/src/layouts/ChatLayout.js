import React from 'react';
import Header from '../components/common/main/Header';
import Aside from '../components/chat/aside';
import Footer from '../components/common/main/Footer';

const ChatLayout = ({ children }) => {
    return (
        <div id="mainContainer">
            <Header />
            {children}
            <Aside />
            <Footer />
        </div>
    );
};

export default ChatLayout;
