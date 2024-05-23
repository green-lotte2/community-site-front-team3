import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BoardTabs from "../../components/board/BoardTabs";
import Search from "../../components/board/Search";
import Table from "../../components/board/Table";
import DefaultLayout from "layouts/DefaultLayout";
import { getList } from "api/ArticleApi";

const List = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //const cno = queryParams.get('cno');
  const pg = queryParams.get('pg');

  const [articleList, setArticleList] = useState(null);

  // render 시 실행 
  useEffect(() => {
    console.log("asdasd");
      // 비동기 함수 정의
      const fetchData = async () => {
          try {
              const response = await getList(8);
              setArticleList(response);
          } catch (error) {
              console.log(error);
          }
      };
      
      // 비동기 함수 호출
      fetchData();

        // cno(카테고리)가 변경될 때마다 실행
      }, []);
  return (
    <DefaultLayout>
      <div className="boardContainer">
        <h2>게시판 목록</h2>
        <BoardTabs />
        <Search />
        <Table  articleList={articleList}/>
      </div>
    </DefaultLayout> 
  );
};

export default List;
