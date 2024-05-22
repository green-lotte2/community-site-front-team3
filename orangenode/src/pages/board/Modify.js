import React from "react";
import { Link } from "react-router-dom";
import BoardTabs from "../../components/board/BoardTabs";
import Editor from "../../components/board/Editor";
import EditorContainer from "../../components/board/EditorContainer";
import BoardContainer from "components/board/BoardContainer";
import DefaultLayout from "layouts/DefaultLayout";

const Modify = () => {
  return (
    <DefaultLayout>
      <BoardContainer props="수정" />
    </DefaultLayout>
  );
};

export default Modify;
