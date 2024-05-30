import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { globalPath } from 'globalPaths';
import { useNavigate } from 'react-router-dom';

const ArticleList = ({ articleList, setArticleList }) => {
    const navigate = useNavigate();
    const url = globalPath.path;

    const del = (ano) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios
                .delete(`${url}/admin/article/${ano}`)
                .then(() => {
                    setArticleList((prevList) => prevList.filter((article) => article.ano !== ano));
                })
                .catch((err) => {
                    console.error('글 삭제 오류:', err);
                });
        }
    };

    const view = (ano) => {
        navigate(`/admin/article/${ano}`);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" />
                    </th>
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>날짜</th>
                    <th>상태</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody>
                {articleList.map((article) => (
                    <tr key={article.ano}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>{article.ano}</td>
                        <td>
                            {article.title}
                            <br />
                            <small>{article.uid}</small>
                        </td>
                        <td>{article.content}</td>
                        <td>{moment(article.rdate).format('YY-MM-DD')}</td>
                        <td>{article.reply}</td>
                        <td>
                            <button onClick={() => del(article.ano)} className="btn-del">
                                삭제
                            </button>
                            <button onClick={() => view(article.ano)} className="btn-view">
                                상세보기
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ArticleList;
