import React from "react";
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
