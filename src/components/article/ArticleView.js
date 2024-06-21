import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";
import "moment/locale/ko";
import { useParams } from "react-router-dom";
import { globalPath } from "globalPaths";
import { useSelector } from "react-redux";
import "../../styles/board.scss";
import { replace } from "connected-react-router";

const url = globalPath.path;

const ArticleView = () => {
  const { ano } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const uid = useSelector((state) => state.authSlice.uid);

  const getComment = async () => {
    axios
      .get(`${url}/articles/${ano}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch comments:", error);
      });
  };

  const getArticle = async () => {
    axios
      .get(`${url}/articles/${ano}`)
      .then((response) => {
        console.log(response.data);
        setArticle(response.data);

        const fixedFilePath = response.data.content.replace(
          "@FilePath###",
          url
        );

        setArticle({ ...response.data, content: fixedFilePath });
      })
      .catch((error) => {
        console.error("Failed to fetch the article:", error);
      });

    // 조회수 증가
    axios
      .post(`${url}/articles/${ano}/incrementHit`)
      .then(() => {
        console.log("조회수 증가");
      })
      .catch((error) => {
        console.error("Failed to increment hit count:", error);
      });
  };

  useEffect(() => {
    getComment();
    getArticle();
  }, [ano]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/articles/${ano}/comments`, { content: newComment, uid })
      .then(() => {
        setNewComment("");
        getComment();
      })
      .catch((error) => {
        console.error("Failed to post comment:", error);
      });
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-view">
      <h2>{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      <div className="article-details">
        <p>작성자: {article.uid}</p>
        <p>
          작성일:{" "}
          {Moment(article.rdate).subtract(1, "month").format("YYYY-MM-DD")}
        </p>
        <p>조회수: {article.hit}</p>
      </div>
      <div className="comments-section">
        <h3>댓글</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
          ></textarea>
          <button type="submit">댓글 작성</button>
        </form>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.ano} className="comment">
              <p>{comment.content}</p>
              <div className="comment-meta">
                <span>작성자: {comment.uid}</span>
                <span>
                  작성일:{" "}
                  {Moment(comment.rdate)
                    .subtract(1, "month")
                    .format("YYYY-MM-DD")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
