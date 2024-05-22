import React from "react";
import BoardTabs from "../../components/board/BoardTabs";
import EditorContainer from "../../components/board/EditorContainer";

const view = () => {
  return (
    <div className="container">
      <h2>게시판 글보기</h2>
      <BoardTabs />
      <EditorContainer />
    </div>
  );
};

export default view;
