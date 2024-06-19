import React from "react";
import { useNavigate } from "react-router-dom";
import Moment from "moment";
import "moment/locale/ko";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const Table = ({ articleList, fetchArticles }) => {
  const navigate = useNavigate();

  const handlerBtnModify = (ano) => {
    navigate(`/article/modify/${ano}`);
  };

  const handlerBtnDelete = async (ano) => {
    try {
      await axios.delete(`${url}/articles/${ano}`);
      fetchArticles(); // 삭제 후 리스트 갱신
    } catch (error) {
      console.error("Failed to delete the article:", error);
    }
  };

  const handlerTitleClick = (ano) => {
    navigate(`/article/view/${ano}`);
  };

  return (
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
          {articleList.map((article, index) => (
            <tr key={article.ano}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td>{article.uid}</td>
              <td>
                <a href="#" onClick={() => handlerTitleClick(article.ano)}>
                  {article.title}
                </a>
              </td>
              <td>
                {Moment(article.rdate)
                  .subtract(1, "months")
                  .format("YYYY-MM-DD")}
              </td>
              <td>{article.hit}</td>
              <td className="table-actions">
                <button
                  className="modify"
                  onClick={() => handlerBtnModify(article.ano)}
                >
                  수정
                </button>
                <button
                  className="delete"
                  onClick={() => handlerBtnDelete(article.ano)}
                >
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

export default Table;
