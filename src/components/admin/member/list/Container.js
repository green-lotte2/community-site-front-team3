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
    const [searchUser, setSearchUser] = useState(''); // 검색 입력 처리
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 저장

    // 회원 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/admin/member/list`, {
                    params: { page: currentPage, size: 10, search: searchQuery },
                });
                const newMembers = response.data;

                setMemberList((prevList) => {
                    if (currentPage === 1) {
                        return newMembers;
                    } else {
                        return [...prevList, ...newMembers];
                    }
                });
                if (newMembers.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setLoading(false);
            } catch (error) {
                console.error('유저를 불러오는데 실패했습니다.', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, url, searchQuery]);

    // 스크롤 하단에 닿을 시 데이터 로드
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

    const searchChange = (e) => {
        setSearchUser(e.target.value);
    };

    // 검색 후 페이지 reload
    const search = () => {
        setCurrentPage(1);
        setHasMore(true);
        setSearchQuery(searchUser);
        setMemberList([]); // 새로운 검색 시 이전 검색 결과를 초기화
    };

    return (
        <div className="container">
            <h2>회원 목록</h2>
            <p>회원을 조회하고 관리합니다.</p>
            <div className="table-actions">
                <button>전체선택</button>
                <input type="text" placeholder="검색할 단어를 입력하세요" value={searchUser} onChange={searchChange} />
                <button onClick={search}>검색하기</button>
            </div>
            <MemberList memberList={memberList} />
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Container;
