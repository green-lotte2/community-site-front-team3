import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleList from './ArticleList';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { globalPath } from 'globalPaths';

const url = globalPath.path;

const Container = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cno = queryParams.get('cno');
    const pg = queryParams.get('pg');

    const [articleList, setArticleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const response = axios
            .get(`${url}/admin/article`, { withCredentials: true })
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err);
                console.log(`${url}/admin/article`);
            });

        console.log(response);
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
            {isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : <ArticleList articleList={articleList} />}
            <Pagination />
        </div>
    );
};

export default Container;
