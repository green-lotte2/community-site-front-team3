import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { LuMailQuestion } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";

const ContentHead = () => {
  return (
    <article style={articleStyle}>
      <Autocomplete
        disablePortal
        options={faqList}
        sx={{ width: 200 }}
        renderInput={(params) => (
          <TextField {...params} label="자주 묻는 질문" />
        )}
      />
      <Button
        size="large"
        variant="outlined"
        href="#outlined-buttons"
        style={button}
      >
        문의하기
        <LuMailQuestion />
      </Button>
    </article>
  );
};
const button = {
  alignItems: "right",
};
const articleStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const faqList = [
  { label: "그그그그" },
  { label: "이이이이" },
  { label: "바바바바" },
  { label: "마마마마" },
  { label: "즈즈즈즈" },
];
export default ContentHead;
