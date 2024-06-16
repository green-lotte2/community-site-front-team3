import React, { useEffect, useState } from "react";
import BoardTabs from "./BoardTabs";
import EditorContainer from "./EditorContainer";
import axios from "axios";

const BoardContainer = ({ props }) => {
  const [boardCate, setBoardCate] = useState([]);

  return (
    <div className="boardContainer">
      <h2>게시판 글{props}</h2>
      <BoardTabs boardCate={boardCate} setBoardCate={setBoardCate} />
      <EditorContainer text={props} />
    </div>
  );
};

export default BoardContainer;
