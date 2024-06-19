import React, { useState } from "react";

const Search = ({ setSearchTerm }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(input);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default Search;
