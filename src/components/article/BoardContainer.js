import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import Editor from "@toast-ui/editor";
import axios from "axios";
import { globalPath } from "globalPaths";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const url = globalPath.path;

const BoardContainer = () => {
  const [cno, setCno] = useState(""); // cno를 사용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loadCate, setLoadCate] = useState([]);
  const editorRef = useRef();
  const editorInstance = useRef();
  const uid = useSelector((state) => state.authSlice.uid);

  useEffect(() => {
    const editor = new Editor({
      el: editorRef.current,
      toolbarItems: [
        ["heading", "bold", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["image"],
        ["table", "link"],
      ],
      height: "700px",
      initialEditType: "wysiwyg",
      previewStyle: "tab",
    });

    editorInstance.current = editor;

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/article/cate`)
      .then((response) => {
        setLoadCate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCateChange = (e) => {
    setCno(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const base64ToFile = (blockDataUrl, fileName) => {
    const dataUrlArr = blockDataUrl.split(",");
    const mime = dataUrlArr[0].match(/:(.*?);/)[1];
    const bstr = atob(dataUrlArr[1]); // atob : Base64 decode
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // 쓴 글을 서버에 전송
  const handleSubmit = async () => {
    if (editorInstance.current) {
      const writeContent = editorInstance.current.getHTML();
      setContent(writeContent);

      let match;
      const matchSrc = /src="([^"]*)"/g;
      const formData = new FormData();
      let contents = writeContent;

      while ((match = matchSrc.exec(writeContent)) !== null) {
        const extension = match[1].split("/")[1].split(";")[0]; // 확장자
        const sName = `image_${uuidv4()}.${extension}`;

        const imgFiles = base64ToFile(match[1], sName);
        const imageURL = `@FilePath###/uploads/${sName}`;
        contents = contents.replace(match[1], imageURL);
        formData.append("imgFiles", imgFiles);
      }

      if (formData.has("imgFiles")) {
        await axios.post(`${url}/cs/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const articleData = {
        uid: uid,
        cno: cno,
        title: title,
        content: contents,
      };

      try {
        await axios.post(`${url}/article`, articleData);
        alert("글이 작성되었습니다.");
        window.location.href = "/article/list";
      } catch (error) {
        alert("글이 작성되지 않았습니다. 잠시 후 시도해주세요.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1500px",
        margin: "0 auto",
      }}
      className="Write"
    >
      <Box
        component="form"
        style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        noValidate
        autoComplete="on"
      >
        <Box style={{ marginRight: "10px", width: "150px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select label="카테고리" value={cno} onChange={handleCateChange}>
              {loadCate.map((cateItem) => (
                <MenuItem key={cateItem.cno} value={cateItem.cno}>
                  {cateItem.cateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box style={{ width: "300px" }}>
          <TextField
            label="제목"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
        </Box>
      </Box>
      <div id="editor" ref={editorRef}></div>
      <Button
        size="large"
        onClick={handleSubmit}
        variant="outlined"
        className="submit-button"
      >
        제출
      </Button>
    </div>
  );
};

export default BoardContainer;
