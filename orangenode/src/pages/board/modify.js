import React from "react";
import { Link } from "react-router-dom";
import BoardTabs from "../../components/board/BoardTabs";
import Editor from "../../components/board/Editor";
import EditorContainer from "../../components/board/EditorContainer";

const modify = () => {
  return (
    <div className="modify">
      <h2>게시판 글수정</h2>
      <BoardTabs />
      <EditorContainer text="수정" />
    </div>
  );
};

export default modify;
