import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BoardTabs from "../../components/board/BoardTabs";
import Search from "../../components/board/Search";
import Table from "../../components/board/Table";
import DefaultLayout from "layouts/DefaultLayout";
import { getList } from "api/ArticleApi";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const List = () => {
  const [articleCate, setArticleCate] = useState([]);
  const [cateValue, setCateValue] = useState("자유게시판");
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/board/cate`)
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
      .get(`${url}/board/list?cateName=${cateValue}`)
      .then((response) => {
        console.log(response.data);
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
