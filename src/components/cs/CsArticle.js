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
  width: "1200px",
  margin: "0 auto",
  //height: "100vh", // 높이를 전체 화면으로 설정하여 세로로도 중앙 정렬 ;
};

export default Article;
