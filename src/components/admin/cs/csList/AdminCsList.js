import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ListComponent from "./ListComponent";
import WriteComponent from "./CsWrite";
import ModifyComponent from "./ModifyComponent";
import { globalPath } from "globalPaths";

const url = globalPath.path;

export default function AdminCsList({ view, setView }) {
  // useEffect 관리
  const [triger, setTriger] = useState(false);
  // 글 내용 관리
  const [csContent, setCsContent] = useState([]);
  // checkbox 관리
  const [selectedRows, setSelectedRows] = useState([]);
  // 글 수정시 게시글 하나 가져오기
  const [selectArticle, setSelectArticle] = useState([]);
  // 카테 리스트 가져오기
  const [cateList, setCateList] = useState([]);

  /**cs 내용 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/cs/selects`)
      .then((response) => {
        console.log(response.data);
        setCsContent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [triger]);

  /**글 작성 버튼 */
  const writeHandler = () => {
    // 글 작성으로 컴포넌트 or 화면 변경
    setView("write");
  };

  /**글 수정 버튼 */
  const modifyHandler = () => {
    if (selectedRows.length === 1) {
      axios
        .get(`${url}/cs/select?csNo=${selectedRows}`)
        .then((response) => {
          console.log(response.data);
          setSelectArticle(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      /** 카테고리 리스트 가져오기 */
      axios
        .get(`${url}/csCate`)
        .then((response) => {
          setCateList(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setView("modify");
    } else {
      alert("수정할 글을 한 개만 선택해주세요.");
    }
  };

  /**삭제 버튼 */
  const deleteHandler = () => {
    if (selectedRows.length > 0) {
      axios
        .get(`${url}/cs/delete?csNo=${selectedRows}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("삭제 되었습니다.");
      setTriger(!triger);
    } else {
      alert("삭제할 글을 선택해주세요.");

      return;
    }
  };

  return (
    <>
      {view === "list" && (
        <>
          <ListComponent
            csContent={csContent}
            setSelectedRows={setSelectedRows}
            triger={triger}
            setTriger={setTriger}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
            }}
          >
            <Button
              style={{ marginLeft: "auto", color: "#000000" }}
              variant="text"
              onClick={writeHandler}
            >
              작성하기
            </Button>
            <Button
              style={{ marginLeft: "10px", color: "#000000" }}
              variant="text"
              onClick={modifyHandler}
            >
              수정하기
            </Button>
            <Button
              style={{ marginLeft: "10px", color: "#000000" }}
              variant="text"
              onClick={deleteHandler}
            >
              삭제하기
            </Button>
          </div>
        </>
      )}
      <div>{view === "write" && <WriteComponent setView={setView} />}</div>
      <div>
        {view === "modify" && (
          <ModifyComponent
            setView={setView}
            selectArticle={selectArticle}
            cateList={cateList}
          />
        )}
      </div>
    </>
  );
}
