import React from "react";
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
