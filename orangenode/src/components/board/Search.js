import React from "react";
import { Button } from '@mui/material';
import { CustomButton } from '../styles/CustomButton';

const Search = () => {
  return (
    <div className="Search">
      <button>검색</button>
      <input type="text" placeholder="Search Invoice" />
      <CustomButton>게시판 생성</CustomButton>
    </div>
  );
};

export default Search;
