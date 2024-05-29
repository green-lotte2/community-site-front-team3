import React from "react";
import Header from "../components/common/main/Header";
import Aside from "../components/chat/Aside";
import Footer from "../components/common/main/Footer";

const ChatLayout = ({ children, setSelectedRoom }) => {
  return (
    <div id="chatContainer">
      <Header />
      <Aside setSelectedRoom={setSelectedRoom} />
      <div className="chat-layout-container">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default ChatLayout;
