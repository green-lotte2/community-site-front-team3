import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import axios from "axios";
import { globalPath } from "globalPaths";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const button = {
  float: "right",
  color: "#000000",
  padding: "10px 20px",
};

const Write = ({ setView }) => {
  // 불러온 카테고리 저장
  const [loadCate, setLoadCate] = useState([]);

  /**작성한 카테고리, 제목, 글 저장 State */
  const [writeCate, setWriteCate] = useState("");
  const [writeTitle, setWriteTitle] = useState("");
  const [writeContent, setWriteContent] = useState("");

  const authSlice = useSelector((state) => state.authSlice);

  const url = globalPath.path;
  const uid = authSlice.uid;

  /**글 작성 state 관리 */
  const handlerCate = (e) => {
    setWriteCate(e.target.value);
  };

  const handlerTitle = (e) => {
    setWriteTitle(e.target.value);
  };

  const handlerContent = (e) => {
    e.preventDefault();
    setWriteContent(e.target.value);
  };

  /** 카테고리 리스트 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/csCate`)
      .then((response) => {
        setLoadCate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**작성, 취소 버튼 메서드 */
  const handlerCancel = () => {
    setView("list");
  };

  /**전송 버튼 */
  const handlerSubmit = (e) => {
    e.preventDefault();

    const jsonData = {
      uid: uid,
      title: writeTitle,
      cateName: writeCate,
      content: writeContent,
    };
    console.log(jsonData);

    axios
      .post(`${url}/cs/write`, jsonData)
      .then((response) => {
        console.log(response.data);
        alert("글이 작성되었습니다!");
        setView("list");
      })
      .catch((err) => {
        alert("글이 작성되지 않았습니다.");
        console.log(err);
      });
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
              value={writeTitle}
              onChange={handlerTitle}
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
              <Select value={writeCate} onChange={handlerCate} displayEmpty>
                {loadCate.map((cate, index) => (
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
            value={writeContent}
            onChange={handlerContent}
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
            작성하기
          </Button>
        </section>
      </Box>
    </div>
  );
};

export default Write;
