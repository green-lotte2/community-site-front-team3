import React from "react";
import { Link } from "react-router-dom";
import BoardTabs from "../../components/board/BoardTabs";
import EditorContainer from "../../components/board/EditorContainer";

const register = () => {
  return (
    <div className="register">
      <h2>게시판 글쓰기</h2>
      <BoardTabs />
      <EditorContainer text="작성" />
    </div>
  );
};

export default register;
