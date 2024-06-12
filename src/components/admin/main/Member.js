import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { globalPath } from 'globalPaths';

const Member = () => {
    const url = globalPath.path;
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${url}/admin/member`);
        };
    });
    return (
        <>
            <div className="member-list">
                <h3>회원 목록</h3>
                <ul>
                    <li>회원 목록 1</li>
                    <li>회원 목록 2</li>
                    <li>회원 목록 3</li>
                    <li>회원 목록 4</li>
                    <li>회원 목록 5</li>
                </ul>
            </div>
        </>
    );
};

export default Member;
