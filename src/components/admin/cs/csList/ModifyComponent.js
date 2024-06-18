import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import { globalPath } from "globalPaths";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const url = globalPath.path;

const ModifyComponent = ({ selectArticle }) => {
  const [changeTitle, setChangeTitle] = useState("");
  const [changeCateName, setChangeCateName] = useState("");

  useEffect(() => {
    setChangeTitle(selectArticle.title);
    setChangeCateName(selectArticle.cateName);
  }, []);

  const handlerChangeTitle = (e) => {
    e.preventDefault();
    setChangeTitle(e.target.value);
  };

  const handlerChangeCateName = (e) => {
    e.preventDefault();
    setChangeCateName(e.target.value);
  };

  return (
    <div>
      <form>
        <span>제목</span>

        <Box style={{ marginRight: "10px", width: "150px" }}>
          <TextField
            variant="outlined"
            value={changeTitle}
            onChange={handlerChangeTitle}
          />
        </Box>

        <Box style={{ marginRight: "10px", width: "150px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              label="카테고리"
              onChange={handlerChangeCateName}
              value={changeCateName}
            ></Select>
          </FormControl>
        </Box>
      </form>
    </div>
  );
};

export default ModifyComponent;
