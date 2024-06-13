import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ListComponent from "./ListComponent";
import { globalPath } from "globalPaths";

const url = globalPath.path;

export default function AdminCsList() {
  const [triger, setTriger] = useState(false);
  const [csContent, setCsContent] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/cs/selects`, { selectedRows })
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
    if ((selectedRows.length = 0)) {
      // 글 수정으로 컴포넌트 or 화면 변경
    } else {
      alert("수정할 글을 선택해주세요.");
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
          onClick={modifyHandler}
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
  );
}
