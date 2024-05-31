import { appVersion } from 'appVersion';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const appversion = appVersion.version;
    return (
        <>
            <footer className="mainFooter">
                <div class="container">
                    <ul>
                        <li>
                            <Link to="#">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#">{appversion}</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default Footer;
