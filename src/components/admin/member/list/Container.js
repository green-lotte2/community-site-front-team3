import React, { useEffect, useState } from 'react';
import MemberList from './MemberList';
import { globalPath } from 'globalPaths';
import axios from 'axios';
import { useInview } from 'react-intersection-observer';

const Container = () => {
    const url = globalPath.path;
    const [memberList, setMemberList] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [hasMore, setHasMore] = useState(true);
    const [ref, inView] = useInview();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/admin/member/list`, {
                    params: { page: currentPage, size: 10 },
                });

                const newMembers = response.data;

                setMemberList((prevList) => [...prevList, ...newMembers]);

                if (newMembers.length < 10) {
                    setHasMore(false);
                }
            } catch (err) {
                console.error('데이터 못 가져옴 ㅋ', err);
            }
        };

        if (inView && hasMore) {
            fetchData();
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore, currentPage, url]);

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
            <div ref={ref} />
        </div>
    );
};

export default Container;
