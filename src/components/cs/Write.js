import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import axios from "axios";
import { globalPath } from "globalPaths";

const Write = ({ editorRef }) => {
  // 불러온 카테고리 저장
  const [loadCate, setLoadCate] = useState([]);

  // 문의글 작성할 때 선택한 카테고리 저장
  const [cate, setCate] = useState("");

  // 문의글 작성할 때 제목 저장
  const [title, setTitle] = useState("");

  const url = globalPath.path;

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "1500px",
    margin: "0 auto",
  };

  const handlerCateChange = (e) => {
    setCate(e.target.value);
  };

  const handlerContent = (e) => {
    setTitle(e.target.value);
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

  useEffect(() => {
    console.log(loadCate);
  }, [loadCate]);

  return (
    <div style={style} className="Write">
      <Box
        component="form"
        style={{
          display: "flex",
          width: "150px",
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          onChange={handlerContent}
          label="제목"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box style={{ width: "150px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">문의 내용</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cate}
            label="문의 내용"
            onChange={handlerCateChange}
          >
            {loadCate.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div id="editor" title={title} cate={cate} ref={editorRef}></div>
    </div>
  );
};

export default Write;
