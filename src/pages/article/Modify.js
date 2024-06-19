import React from "react";
import BoardContainer from "components/article/BoardContainer";
import DefaultLayout from "layouts/DefaultLayout";
import ArticleEdit from "components/article/ArticleEdit";

const Modify = () => {
  return (
    <DefaultLayout>
      <ArticleEdit />
    </DefaultLayout>
  );
};

export default Modify;
