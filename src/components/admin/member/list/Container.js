import React, { useEffect, useState } from 'react';
import MemberList from './MemberList';
import { globalPath } from 'globalPaths';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Container = () => {
    const url = globalPath.path;
    const [memberList, setMemberList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchUser, setSearchUser] = useState(''); // 검색 입력 처리
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 저장

    // 회원 데이터 가져오기
    const fetchData = async (page, query) => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/admin/member/search`, {
                params: { page, size: 10, search: query },
            });
            const newMembers = response.data;

            setMemberList((prevList) => {
                if (page === 1) {
                    return newMembers;
                } else {
                    return [...prevList, ...newMembers];
                }
            });
            if (newMembers.length < 10) {
                // 10명 이하면 그만 불러오기
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

    useEffect(() => {
        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

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

    // enter key 로 검색하기
    const keydown = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    const fetchMoreData = () => {
        if (!loading && hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="container">
            <h2>회원 목록</h2>
            <p>회원을 조회하고 관리합니다.</p>
            <div className="table-actions">
                <button>전체선택</button>
                <input
                    type="text"
                    placeholder="검색할 단어를 입력하세요"
                    value={searchUser}
                    onChange={searchChange}
                    onKeyDown={keydown} // 엔터키 입력시 검색
                />
                <button onClick={search}>검색하기</button>
            </div>
            <InfiniteScroll
                dataLength={memberList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>검색 중...</h4>}
                endMessage={<p>검색이 완료 되었습니다.</p>}
            >
                <MemberList memberList={memberList} />
            </InfiniteScroll>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Container;
