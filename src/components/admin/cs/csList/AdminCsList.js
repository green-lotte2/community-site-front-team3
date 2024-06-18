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

  useEffect(() => {
    console.log(triger);
  }, [triger]);

  useEffect(() => {
    console.log(csContent);
  }, [csContent]);

  const writeHandler = () => {
    // 글 작성으로 컴포넌트 or 화면 변경
  };

  const modifyHandler = () => {
    if (selectedRows.length === 1) {
      // 글 수정으로 컴포넌트 or 화면 변경
      setView("modify");
    } else {
      alert("수정할 글을 한 개만 선택해주세요.");
    }
  };

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

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

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
      <div>
        {view === "write" && (
          <WriteComponent selectedRows={selectedRows} setView={setView} />
        )}
      </div>
      <div>
        {view === "modify" && (
          <ModifyComponent setView={setView} selectedRows={selectedRows} />
        )}
      </div>
    </>
  );
}
