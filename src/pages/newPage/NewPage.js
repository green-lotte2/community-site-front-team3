import React, { useRef, useState } from "react";
import DefaultLayout from "layouts/DefaultLayout";
import { useParams } from "react-router-dom";
import Editor from "components/newPage/Editor";

const NewPage = () => {
  const { pageNo } = useParams();
  const [titleStat, setTitleStat] = useState("");

  /** 문서 내용 조회 상태 */
  const [eachDocView, setEachDocView] = useState("");
  const [pageState, setPageState] = useState(false);

  return (
    <DefaultLayout titleStat={titleStat} setPageState={setPageState}>
      <div className="NewPageMain">
        {pageState && (
          <Editor
            pageNo={pageNo}
            setTitleStat={setTitleStat}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default NewPage;
