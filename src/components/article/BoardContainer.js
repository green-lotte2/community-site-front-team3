import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BoardTabs from "./BoardTabs";
import EditorContainer from "./EditorContainer";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const BoardContainer = ({ props }) => {
  const { ano } = useParams();
  const [boardCate, setBoardCate] = useState([]);
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

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

  return (
    <div className="boardContainer">
      <h2>게시판 글{props}</h2>
      <BoardTabs boardCate={boardCate} setBoardCate={setBoardCate} />
      <EditorContainer text={props} article={article} />
    </div>
  );
};

export default BoardContainer;
