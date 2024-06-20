import React, { useEffect, useState } from "react";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { globalPath } from "globalPaths";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSelector } from "react-redux";

const url = globalPath.path;

const button = {
  float: "right",
  color: "#000000",
  padding: "10px 20px",
};

const ModifyComponent = ({ selectArticle, cateList, setView }) => {
  const [changeTitle, setChangeTitle] = useState("");
  const [changeCateName, setChangeCateName] = useState("");
  const [changeContent, setChangeContent] = useState("");
  const authSlice = useSelector((state) => state.authSlice);

  /**가져온 글 state에 set 해주기 */
  useEffect(() => {
    setChangeTitle(selectArticle.title);
    setChangeCateName(selectArticle.cateName);
    setChangeContent(selectArticle.content);
  }, [selectArticle]);

  /** 글 수정 onChange 메서드*/
  const handlerChangeTitle = (e) => {
    e.preventDefault();
    setChangeTitle(e.target.value);
  };
  const handlerChangeCateName = (e) => {
    e.preventDefault();
    setChangeCateName(e.target.value);
  };
  const handlerChangeContent = (e) => {
    e.preventDefault();
    setChangeContent(e.target.value);
  };

  /** 수정 버튼 클릭 메서드*/
  const handlerSubmit = (e) => {
    e.preventDefault();

    const jsonData = {
      csNo: selectArticle.csNo,
      uid: authSlice.uid,
      title: changeTitle,
      cateName: changeCateName,
      content: changeContent,
    };

    axios
      .post(`${url}/cs/modify`, jsonData)
      .then((response) => {
        console.log(response.data);
        alert("수정되었습니다!");
        setView("list");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** 취소 버튼 클릭 메서드*/
  const handlerCancel = () => {
    return;
  };

  return (
    <div>
      <Box
        component="form"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
        noValidate
      >
        <Box
          style={{
            display: "flex",
            marginBottom: "15px",
            width: "1000px",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "20px",
              width: "850px",
            }}
          >
            <span style={{ display: "flex", marginBottom: "5px" }}>제목</span>
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              value={changeTitle}
              onChange={handlerChangeTitle}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
            }}
          >
            <span style={{ display: "block", marginBottom: "5px" }}>
              카테고리
            </span>
            <FormControl variant="outlined" style={{ width: "190px" }}>
              <Select
                value={changeCateName}
                onChange={handlerChangeCateName}
                displayEmpty
              >
                {cateList.map((cate, index) => (
                  <MenuItem key={index} value={cate}>
                    {cate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box style={{ marginBottom: "15px", width: "1000px" }}>
          <span style={{ display: "block", marginBottom: "5px" }}></span>
          <TextField
            style={{ width: "100%" }}
            variant="outlined"
            multiline
            rows={15}
            value={changeContent}
            onChange={handlerChangeContent}
          />
        </Box>
        <section>
          <Button
            size="medium"
            variant="text"
            onClick={handlerCancel}
            style={button}
          >
            취소
          </Button>

          <Button
            size="medium"
            onClick={handlerSubmit}
            variant="text"
            style={button}
          >
            수정하기
          </Button>
        </section>
      </Box>
    </div>
  );
};

export default ModifyComponent;
