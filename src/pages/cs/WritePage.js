import React from "react";
import DefaultLayout from "layouts/DefaultLayout";
import Write from "components/cs/Write";
import WriteFooter from "components/cs/WriteFooter";

const WritePage = () => {
  return (
    <DefaultLayout>
      <div>
        <Write />
        <WriteFooter />
      </div>
    </DefaultLayout>
  );
};

export default WritePage;
