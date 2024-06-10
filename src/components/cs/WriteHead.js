import React from "react";

const writeHead = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    width: "1500px",
    margin: "0 auto",
  };

  const question = {
    display: "flex",
    flexDirection: "column",
    marginTop: "15px",
    marginBottom: "15px",
  };
  return (
    <div>
      <h2 style={style}>문의하기</h2>
    </div>
  );
};

export default writeHead;
