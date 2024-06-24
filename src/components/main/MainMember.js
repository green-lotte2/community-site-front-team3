import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const MainMember = ({ profile, url }) => {
    const authSlice = useSelector((state) => state.authSlice);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        company: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/user/info?uid=${authSlice.uid}`, {
                    withCredentials: true,
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [url]);

    return (
        <div>
            <h4>이름 : {userData.name}</h4>
            <p>email : {userData.email}</p>
            <p>회사 : {userData.company}</p>
            <p>부서 : {userData.department}</p>
            <p>직급 : {userData.position}</p>
        </div>
    );
};

export default MainMember;
