import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
    return (
        <>
            <aside>
                <ul>
                    <li>
                        <Link to="#">Call Support</Link>
                    </li>
                    <li>
                        <Link to="#">Live Chat</Link>
                    </li>
                    <li>
                        <Link to="#">Email Us</Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
