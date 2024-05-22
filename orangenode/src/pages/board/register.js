import React from "react";
import { Link } from "react-router-dom";
import BoardTabs from "../../components/board/BoardTabs";
import EditorContainer from "../../components/board/EditorContainer";
import BoardContainer from "components/board/BoardContainer";
import DefaultLayout from "layouts/DefaultLayout";

const Register = () => {
  return (
    <DefaultLayout>
      <BoardContainer props="작성"/>
    </DefaultLayout>
  );
};

export default Register;
