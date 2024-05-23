import React from 'react';
import Header from '../components/common/admin/Header';
import Aside from '../components/common/admin/Aside';
import Footer from '../components/common/admin/Footer';

export const AdminDefaultLayout = ({ children }) => {
    return (
        <div id="adminContainer" className="adminContainer">
            <Header />
            <div className="content-wrapper">
                <main>{children}</main>
                <Aside />
            </div>
            <Footer />
        </div>
    );
};
