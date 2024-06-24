import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleList from './ArticleList';
import axios from 'axios';
import Pagination from 'components/common/Pagination';
import { globalPath } from 'globalPaths';

const url = globalPath.serverHost;

const Container = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cno = queryParams.get('cno');
    const pg = queryParams.get('pg');
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get(`http://${url}/admin/article`); // 정렬 파라미터 추가
            setArticleList(response.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
        return posts.slice(indexOfFirst, indexOfLast);
    };

    return (
        <div className="container">
            <h2>게시글 관리</h2>
            <p>-- 게시글 수정, 삭제 및 조회 --</p>
            <div className="table-actions"></div>
            {<ArticleList articleList={currentPosts(articleList)} setArticleList={setArticleList} />}
            <Pagination postsPerPage={postsPerPage} totalPosts={articleList.length} paginate={setCurrentPage} />
        </div>
    );
};

export default Container;
