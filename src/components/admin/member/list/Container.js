import React, { useEffect, useState } from 'react';

import MemberList from './MemberList';
import { globalPath } from 'globalPaths';
import axios from 'axios';
import { Pagination } from '@mui/material';

const Container = () => {
    const url = globalPath.path;
    const [memberList, setMemberList] = useState([]);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${url}/admin/member/list`);
            setMemberList(response.data);
        };
        fetchData();
    }, []);

    const indexOfLast = currentPage * postsPerPage;
    console.log('indexOfLast', indexOfLast.length);
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentUsers = (members) => {
        return members.slice(indexOfFirst, indexOfLast);
    };
    console.log('currentUsers', currentUsers.length);

    return (
        <>
            <div className="container">
                <h2>회원 관리</h2>
                <p>Manage your content and projects efficiently</p>
                <div className="table-actions">
                    <button>Action</button>
                    <input type="text" placeholder="Search Invoice" />
                    <button>Create Invoice</button>
                </div>
                {<MemberList memberList={currentUsers(memberList)} setMemberList={setMemberList} />}
                <Pagination postsPerPage={postsPerPage} totalPosts={memberList.length} paginate={setCurrentPage} />
            </div>
        </>
    );
};

export default Container;
