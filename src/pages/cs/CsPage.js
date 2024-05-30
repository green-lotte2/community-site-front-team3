import DefaultLayout from "layouts/DefaultLayout";
import CsArticle from "components/cs/CsArticle";

import React from "react";

const CsPage = () => {
  return (
    <DefaultLayout>
      <div className="CsPage">
        <CsArticle />
      </div>
    </DefaultLayout>
  );
};

export default CsPage;
