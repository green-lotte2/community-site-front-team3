import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // pageNo가 변경될 때마다 pageState를 true로 설정
    setPageState(false);
    setTimeout(() => {
      setPageState(true);
    }, 0); // 0ms 딜레이 후 true로 설정
  }, [pageNo]);

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
      <div className="NewPageMain" style={{ marginTop: "0" }}>
        {pageState && (
          <Editor
            pageNo={pageNo}
            submitPage={submitPage}
            setTitleStat={setTitleStat}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default NewPage;
