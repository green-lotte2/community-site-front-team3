import React, { useRef, useState } from "react";
import Editor from "./Editor";

const NewPageMain = ({ pageNo, setTitleStat }) => {
  /** 문서 내용 조회 상태? */
  const [docState, setDocState] = useState(false);

  // 만약 글 내용이 있으면 출력, 없으면 새 editor 추가
  return (
    <div className="NewPageMain" style={{ marginTop: "0" }}>
      {docState && <Editor pageNo={pageNo} setTitleStat={setTitleStat} />}
    </div>
  );
};

export default NewPageMain;
