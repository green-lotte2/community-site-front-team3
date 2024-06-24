import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { globalPath } from 'globalPaths';
import { useNavigate } from 'react-router-dom';

const ArticleList = ({ articleList, setArticleList }) => {
    const [selectedArticles, setSelectedArticles] = useState([]); // 게시글 저장하는 상태
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태를 저장하는 상태
    const navigate = useNavigate();
    const url = globalPath.path;

    // 게시글 전체 선택, selectedArticles 상태를 업데이트
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedArticles([]);
        } else {
            setSelectedArticles(articleList.map((article) => article.ano));
        }
        setSelectAll(!selectAll);
    };

    // 게시글 개별 선택, 선택된 article의 id를 selectedArticles 상태에 추가하거나 제거
    const handleSelectArticle = (ano) => {
        setSelectedArticles((prevSelected) =>
            prevSelected.includes(ano) ? prevSelected.filter((id) => id !== ano) : [...prevSelected, ano]
        );
    };

    // 게시글 선택 삭제

    const handleDelSelected = () => {
        if (window.confirm('선택한 게시글(들)을 삭제하시겠습니까?')) {
            selectedArticles.forEach((ano) => {
                axios
                    .delete(`${url}/admin/article/${ano}`)
                    .then(() => {
                        setArticleList((prevList) => prevList.filter((article) => article.ano !== ano));
                        setSelectedArticles((prevSelected) => prevSelected.filter((id) => id !== ano));
                    })
                    .catch((err) => {
                        console.error('글 삭제 오류:', err);
                    });
            });
            setSelectAll(false);
        }
    };

    // 게시글 삭제 버튼
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

    // 게시글 상세보기
    const view = (ano) => {
        navigate(`/admin/article/${ano}`);
    };

    // 게시글 내용 ... 출력
    const cutContent = (content, maxLength) => {
        return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
    };

    return (
        <div>
            <button onClick={handleDelSelected} className="btn-del-selected">
                선택삭제
            </button>
            <table className="admin-article-table">
                <thead>
                    <tr className="admin-article-tabl-tr">
                        <th className="admin-article-checkbox">
                            전체선택
                            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                        </th>
                        <th className="admin-article-no">번호</th>
                        <th className="admin-article-title">제목</th>
                        <th>날짜</th>
                        <th>상태</th>
                        <th className="admin-article-set">관리</th>
                    </tr>
                </thead>
                <tbody>
                    {articleList.map((article) => (
                        <tr key={article.ano}>
                            <td className="admin-article-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedArticles.includes(article.ano)}
                                    onChange={() => handleSelectArticle(article.ano)}
                                />
                            </td>
                            <td className="no">{article.ano}</td>
                            <td>
                                {article.title}
                                <br />
                                <small>{article.uid}</small>
                            </td>
                            <td>{moment(article.rdate).format('YY-MM-DD')}</td>
                            <td>{article.reply}</td>
                            <td>
                                <button onClick={() => view(article.ano)} className="btn-view">
                                    상세보기
                                </button>
                                <button onClick={() => del(article.ano)} className="btn-del">
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleList;
