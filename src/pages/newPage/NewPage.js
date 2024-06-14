import React, { useRef, useState } from "react";
import DefaultLayout from "layouts/DefaultLayout";
import { useParams } from "react-router-dom";
import Editor from "components/newPage/Editor";
import axios from "axios";
import { globalPath } from "globalPaths";

const path = globalPath.path;

const NewPage = () => {
  const { pageNo } = useParams();
  const [titleStat, setTitleStat] = useState("");

  /** 문서 내용 조회 상태 */
  const [pageState, setPageState] = useState(false);

  /** 서버로 데이터 전송 테스트 */
  const submitPage = async (document, page) => {
    const docContent = JSON.stringify(document);

    try {
      const resp = await axios.post(
        `${path}/savepage`,
        {
          content: docContent,
          uid: page.uid,
          pageNo: page.pageNo,
          title: page.title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", resp);
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  return (
    <DefaultLayout titleStat={titleStat} setPageState={setPageState}>
      <div className="NewPageMain">
        {pageState && <Editor pageNo={pageNo} submitPage={submitPage} />}
      </div>
    </DefaultLayout>
  );
};

export default NewPage;
