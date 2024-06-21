import axios from 'axios';
import { globalPath } from 'globalPaths';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const Recent = () => {
    const url = globalPath.path;
    const [articleList, setArticleList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${url}/admin/article`);
            setArticleList(response.data.slice(0, 5)); // 최대 5개로 제한
        };
        fetchData();
    }, [url]);

    return (
        <div className="recent-items">
            <h3>최근 게시물</h3>
            <ItemContainer>
                {articleList.map((article) => (
                    <Item key={article.ano}>
                        <ul>
                            제목:{' '}
                            <Link className="recent-title" to={`/admin/article/${article.ano}`}>
                                {article.title}
                            </Link>
                            <li>
                                <small>작성자: {article.uid}</small>
                            </li>
                            <DateItem>작성일: {moment(article.rdate).format('YY-MM-DD')}</DateItem>
                        </ul>
                    </Item>
                ))}
            </ItemContainer>
        </div>
    );
};

export default Recent;

// Styled Components
const ItemContainer = styled.div`
    display: flex;
    flex-direction: column; /* 항목을 세로로 정렬 */
    gap: 10px; /* 항목 간의 간격 설정 */
    color: #86879d;
`;

const Item = styled.div`
    ul {
        display: flex; /* 가로로 정렬 */
        list-style: none;
        padding: 0;
        gap: 5px; /* li 요소 간의 간격 설정 */
        justify-content: space-between; /* li 요소를 양 끝에 배치 */
    }
    li {
        margin-bottom: 10px;
    }
`;

const DateItem = styled.li`
    margin-left: auto; /* 오른쪽으로 정렬 */
`;
