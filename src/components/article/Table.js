import React from "react";
import Moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const Table = ({ articleList, fetchArticles }) => {
  const navigate = useNavigate();

  const handleModify = (ano) => {
    navigate(`/article/modify/${ano}`);
  };

  const handleDelete = async (ano) => {
    try {
      await axios.delete(`${url}/articles/${ano}`);
      fetchArticles(); // 삭제 후 리스트 갱신
    } catch (error) {
      console.error("Failed to delete the article:", error);
    }
  };

  const handleTitleClick = (ano) => {
    navigate(`/article/view/${ano}`);
  };

  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>등록일</th>
            <th>조회수</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {articleList.map((article, index) => (
            <tr key={article.ano}>
              <td>{index + 1}</td>
              <td>
                <a href="#" onClick={() => handleTitleClick(article.ano)}>
                  {article.title}
                </a>
              </td>
              <td>{article.uid}</td>
              <td>{Moment(article.rdate).format("YYYY-MM-DD")}</td>
              <td>{article.hit}</td>
              <td className="table-actions">
                <button
                  className="modify"
                  onClick={() => handleModify(article.ano)}
                >
                  수정
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(article.ano)}
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
