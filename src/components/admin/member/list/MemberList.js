import React from 'react';

const ArticleList = () => {
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
                            회원 이름
                            <br />
                            <small>회원 E-Mail</small>
                        </td>
                        <td>24-05-20</td>
                        <td>
                            <span className="status paid">Paid</span>
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
