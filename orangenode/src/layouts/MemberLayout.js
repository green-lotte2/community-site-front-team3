import React from 'react';
import Header from '../components/common/main/Header';
import Footer from '../components/common/main/Footer';

const memberLayout = ({ children }) => {
    return (
        <div id="mainContainer">
            {children}
            <Footer />
        </div>
    );
};

export default memberLayout;
