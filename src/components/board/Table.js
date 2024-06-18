import React from "react";
import Moment from "moment";
import "moment/locale/ko";

const Table = ({ articleList }) => {
  const handlerBtnModify = () => {};
  const handlerBtnDelete = () => {};

  return (
    <>
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>번호</th>
              <th>작성자</th>
              <th>제목</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {articleList.map((article, index) => {
              return (
                <tr key={article.ano}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index + 1}</td>
                  <td>{article.uid}</td>
                  <td>{article.title}</td>
                  <td>
                    {Moment(article.rdate)
                      .subtract(1, "months")
                      .format("YYYY-MM-DD")}
                  </td>
                  <td>{article.hit}</td>
                  <td>
                    <button onClick={handlerBtnModify}>수정</button>
                    <button onClick={handlerBtnDelete}>삭제</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
