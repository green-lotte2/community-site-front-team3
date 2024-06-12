import React, { useEffect, useState } from 'react';
import MemberList from './MemberList';
import { globalPath } from 'globalPaths';
import axios from 'axios';

const Container = () => {
    const url = globalPath.path;
    const [memberList, setMemberList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/admin/member/list`, {
                    params: { page: currentPage, size: 10 },
                });
                const newMembers = response.data;

                setMemberList((prevList) => [...prevList, ...newMembers]);
                if (newMembers.length < 10) {
                    setHasMore(false);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch members:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, url]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                if (!loading && hasMore) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <div className="container">
            <h2>회원 관리</h2>
            <p>Manage your content and projects efficiently</p>
            <div className="table-actions">
                <button>Action</button>
                <input type="text" placeholder="Search Invoice" />
                <button>Create Invoice</button>
            </div>
            <MemberList memberList={memberList} setMemberList={setMemberList} />
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Container;
