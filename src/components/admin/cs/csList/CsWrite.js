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

const Write = ({ setCate, setTitle, editorRef }) => {
  // 불러온 카테고리 저장
  const [loadCate, setLoadCate] = useState([]);

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
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
        }}
        noValidate
        autoComplete="on"
      >
        <Box style={{ marginRight: "10px", width: "150px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">문의 내용</InputLabel>
            <Select label="문의 내용" onChange={handlerCateChange}>
              {loadCate.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box style={{ width: "300px" }}>
          <TextField
            onChange={handlerContent}
            label="제목"
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>
      <div id="editor" ref={editorRef}></div>
    </div>
  );
};

export default Write;
