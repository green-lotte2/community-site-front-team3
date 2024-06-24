import React, { useState } from "react";

const Search = ({ searchKeyword }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    searchKeyword(input);
  };

  console.log("???", searchKeyword);

  return (
    <div className="search-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default Search;
