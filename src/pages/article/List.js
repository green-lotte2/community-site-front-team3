import React, { useEffect, useState } from "react";
import BoardTabs from "../../components/board/BoardTabs";
import Search from "../../components/board/Search";
import Table from "../../components/board/Table";
import DefaultLayout from "layouts/DefaultLayout";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const List = () => {
  const [articleCate, setArticleCate] = useState([]);
  const [cateValue, setCateValue] = useState("자유게시판");
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/article/cate`)
      .then((response) => {
        console.log(response.data);
        setArticleCate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/article/list?cateName=${cateValue}`)
      .then((response) => {
        console.log("List", response.data);
        setArticleList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cateValue]);

  return (
    <DefaultLayout>
      <div className="boardContainer">
        <h2>게시판 목록</h2>
        <BoardTabs articleCate={articleCate} setCateValue={setCateValue} />
        <Search />
        <Table articleList={articleList} />
      </div>
    </DefaultLayout>
  );
};

export default List;
