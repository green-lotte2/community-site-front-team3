import axios from 'axios';
import { globalPath } from 'globalPaths';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const Container = () => {
    const navigate = useNavigate();
    const { ano } = useParams();
    const [article, setArticle] = useState(null);
    const url = globalPath.path;

    // 상세 보기
    useEffect(() => {
        console.log('번호 받아오나?', ano);
        axios
            .get(`${url}/admin/article/${ano}`)
            .then((response) => {
                console.log('게시글 정보?', response.data);
                console.log('Article structure:', JSON.stringify(response.data, null, 2)); // 데이터 구조 확인용 로그
                setArticle(response.data);
            })
            .catch((err) => {
                console.error('글 가져오기 오류: ', err);
            });
    }, [ano, url]);

    // 수정 내용 저장
    const updArticle = () => {
        if (window.confirm('수정이 완료되었습니다.')) {
            axios
                .put(`${url}/admin/article/${ano}`, article)
                .then((response) => {
                    console.log('수정됨?', response.data);
                    navigate('/admin/article');
                })
                .catch((err) => {
                    console.error('수정 안됨?', err);
                });
        }
    };

    if (!article) return <div>불러오는 중입니다...</div>;

    return (
        <>
            <div className="container">
                <h2>게시글 상세보기</h2>
                <p>이용자가 작성한 글을 보고 수정, 삭제가 가능합니다</p>
                <div className="post-details">
                    <div className="post-header">
                        <input
                            className="post-header-title"
                            type="text"
                            value={article.title}
                            onChange={(e) => setArticle({ ...article, title: e.target.value })}
                        ></input>
                        <div className="post-info">
                            <span>{article.uid}</span>
                            <span>{moment(article.rdate).format('YY-MM-DD')}</span>
                        </div>
                    </div>
                    <textarea
                        className="post-content"
                        value={article.content}
                        onChange={(e) => setArticle({ ...article, content: e.target.value })}
                    ></textarea>
                    <div className="post-actions">
                        <Link to="/admin/article" className="list">
                            목록
                        </Link>
                        <div className="actions-right">
                            <Link to="#" className="delete">
                                삭제
                            </Link>
                            <button onClick={updArticle} className="edit">
                                수정
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Container;
