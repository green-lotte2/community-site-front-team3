import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArticleList from './ArticleList';
import { Pagination } from '@mui/material';
import { getList } from 'api/ArticleApi';

const Container = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cno = queryParams.get('cno');
    const pg = queryParams.get('pg');

    const [articleList, setArticleList] = useState(null);

    // render 시 실행 
    useEffect(() => {
        // 비동기 함수 정의
        const fetchData = async () => {
            try {
                const response = await getList(cno);
                setArticleList(response);
            } catch (error) {
                console.log(error);
            }
        };
        
        // 비동기 함수 호출
        fetchData();

          // cno(카테고리)가 변경될 때마다 실행
        }, [cno]);
    

    return (
        <>
            <div class="container">
                <h2>게시글 관리</h2>
                <p>Manage your content and projects efficiently</p>
                <div class="table-actions">
                    <button>Action</button>
                    <input type="text" placeholder="Search Invoice" />
                    <button>Create Invoice</button>
                </div>
                <ArticleList articleList={articleList}/>
                <Pagination />
            </div>
        </>
    );
};

export default Container;
