import React from 'react';

const ArticleList = ({ articleList }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" />
                    </th>
                    <th>번호</th>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>상태</th>
                    <th>액션</th>
                </tr>
            </thead>
            <tbody>
                {articleList.map((article, index) => (
                    <tr key={index}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>#{article.no}</td>
                        <td>
                            {article.title}
                            <br />
                            <small>{article.uid}</small>
                        </td>
                        <td>{article.rdate}</td>
                        <td></td>
                        <td>
                            <button>...</button>
                        </td>
                    </tr>
                ))(
                    <tr>
                        <td colSpan="6">No articles available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ArticleList;
