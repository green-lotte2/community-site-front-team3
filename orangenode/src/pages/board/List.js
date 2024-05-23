import React from "react";
import { Link } from "react-router-dom";
import BoardTabs from "../../components/board/BoardTabs";
import Search from "../../components/board/Search";
import Table from "../../components/board/Table";
import DefaultLayout from "layouts/DefaultLayout";

const List = () => {
  return (
    <DefaultLayout>
      <div className="boardContainer">
        <h2>게시판 목록</h2>
        <BoardTabs />
        <Search />
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default List;
