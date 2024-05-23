import React from "react";
import { Button } from '@mui/material';
import { CustomButton } from '../styles/CustomButton';

const Search = () => {
  return (
    <div className="Search">
      <input type="text" placeholder="Search Invoice" />
      <button>검색</button>
    
      <CustomButton className="CustomButton">게시판 생성</CustomButton>
    </div>
  );
};

export default Search;
