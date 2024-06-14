import React, { useRef, useState } from "react";
import Editor from "./Editor";

const NewPageMain = ({ pageNo, setTitleStat }) => {
  /** 문서 내용 조회 상태? */
  const [eachDocView, setEachDocView] = useState("");
  const [docState, setDocState] = useState(false);

  const pageRef = useRef({
    title: "",
    uid: "",
  });

  // 글 내용 조회

  // 만약 글 내용이 있으면 출력, 없으면 새 editor 추가
  return (
    <div className="NewPageMain">
      {docState && eachDocView && (
        <Editor pageNo={pageNo} setTitleStat={setTitleStat} eachDocView={eachDocView} />
      )}
    </div>
  );
};

export default NewPageMain;
