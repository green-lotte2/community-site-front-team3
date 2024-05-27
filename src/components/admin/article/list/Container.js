import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleList from './ArticleList';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { globalPath } from 'globalPaths';

/*const Container = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cno = queryParams.get('cno');
    const pg = queryParams.get('pg');

    console.log(pg);

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
*/

const url = globalPath.path;

// 글 목록 가져오기
const fetchAdminArticleList = async () => {
    try {
        const response = await axios.get(`${url}/admin/article`);
        return response.data;
    } catch (error) {
        console.error('데이터 들어오나요?', error);
        throw error;
    }
};

const Container = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cno = queryParams.get('cno');
    const pg = queryParams.get('pg');

    const [articleList, setArticleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetchAdminArticleList();
                setArticleList(response.data);

                console.log('response here?', response);
            } catch (error) {
                setError('글을 가져오지 못했습니다 ㅠㅠ');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [cno]);

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
