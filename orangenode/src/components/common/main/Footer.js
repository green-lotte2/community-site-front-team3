import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer>
                <div class="container">
                    <ul>
                        <li>
                            <Link to="#">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#">Terms of Service</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default Footer;
