import React from 'react';

const ArticleList = ({articleList}) => {
    return (
        <>
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
                    <tr>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>#4610</td>
                        <td>
                            게시물 제목
                            <br />
                            <small>작성자 이름</small>
                        </td>
                        <td>24-05-20</td>
                        <td>
                            <span class="status paid">Paid</span>
                        </td>
                        <td>
                            <button>...</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default ArticleList;
