import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const ArticleEdit = () => {
  const { ano } = useParams();
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${url}/articles/${ano}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch the article:", error);
      }
    };
    fetchArticle();
  }, [ano]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/articles/${ano}`, article);
      navigate("/article/list");
    } catch (error) {
      console.error("Failed to update the article:", error);
    }
  };

  return (
    <div className="edit-container">
      <h2>게시글 수정</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            name="content"
            value={article.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">저장</button>
        <button type="button" onClick={() => navigate("/article/list")}>
          취소
        </button>
      </form>
    </div>
  );
};

export default ArticleEdit;
