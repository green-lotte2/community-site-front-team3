import React from 'react';

const Welcome = () => {
    return (
        <>
            <div class="welcome">
                <div class="user-info">
                    <div class="user-avatar">
                        <img src="avatar_placeholder.png" alt="User Avatar" />
                    </div>
                    <div class="user-details">
                        <h2>Welcome, User</h2>
                        <p class="user-role">New Member</p>
                        <p>Join our community to connect and share!</p>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="learn-more">Learn More</button>
                    <button class="join-now">Join Now</button>
                </div>
            </div>
        </>
    );
};

export default Welcome;
