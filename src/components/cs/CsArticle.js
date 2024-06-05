import Header from "components/cs/Header";
import Content from "components/cs/Content";
import React from "react";

const Article = () => {
  return (
    <div className="CsArticle" style={style}>
      <Header />
      <Content></Content>
    </div>
  );
};

const style = {
  display: "flex",
  flexDirection: "column",
  width: "1500px",
  margin: "0 auto",
};

export default Article;
