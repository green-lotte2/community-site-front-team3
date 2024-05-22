import React from 'react';

const Updates = () => {
    return (
        <>
            <div class="updatess">
                <h2>Latest Updates</h2>
                <div class="updates">
                    <div class="update">
                        <img src="feature_icon.png" alt="Feature Icon" />
                        <h3>New Feature Released</h3>
                        <p>Check out the latest updates</p>
                        <p class="time">5 days ago</p>
                    </div>
                    <div class="update">
                        <img src="event_icon.png" alt="Event Icon" />
                        <h3>Upcoming Event</h3>
                        <p>Save the date for our community gathering</p>
                        <p class="time">2 weeks to go</p>
                    </div>
                    <div class="update">
                        <img src="announcement_icon.png" alt="Announcement Icon" />
                        <h3>Important Announcement</h3>
                        <p>Stay informed about important news</p>
                        <p class="time">Just In</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Updates;
