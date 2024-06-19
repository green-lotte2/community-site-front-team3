import React from "react";
import { CustomButton } from "../styles/CustomButton";

const Search = () => {
  return (
    <div className="Search">
      <input type="text" placeholder="Search Invoice" />
      <button>검색</button>
    </div>
  );
};

export default Search;
