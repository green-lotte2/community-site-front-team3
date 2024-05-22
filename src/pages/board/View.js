import React from "react";
import BoardTabs from "../../components/board/BoardTabs";
import EditorContainer from "../../components/board/EditorContainer";
import BoardContainer from "components/board/BoardContainer";
import DefaultLayout from "layouts/DefaultLayout";

const View = () => {
  return (
    <DefaultLayout>
      <BoardContainer props="보기"/>
    </DefaultLayout>
  );
};

export default View;
