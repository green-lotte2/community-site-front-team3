import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleList from './ArticleList';
import axios from 'axios';
import Pagination from 'components/common/Pagination';
import { globalPath } from 'globalPaths';

const url = globalPath.path;

const Container = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cno = queryParams.get('cno');
    const pg = queryParams.get('pg');

    const [articleList, setArticleList] = useState([]);
    // axios.get(`${url}/admin/article`).then((response) => setArticleList(response.data));

    useEffect(() => {
        axios.get(`${url}/admin/article`).then((response) => setArticleList(response.data));
    }, []);

    return (
        <div className="container">
            <h2>게시글 관리</h2>
            <p>Manage your content and projects efficiently</p>
            <div className="table-actions">
                <button>Action</button>
                <input type="text" placeholder="Search Invoice" />
                <button>Create Invoice</button>
            </div>
            {<ArticleList articleList={articleList} setArticleList={setArticleList} />}
            <Pagination />
        </div>
    );
};

export default Container;
