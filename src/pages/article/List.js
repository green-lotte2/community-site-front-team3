import React, { useEffect, useState } from "react";
import BoardTabs from "../../components/article/BoardTabs";
import Search from "../../components/article/Search";
import Table from "../../components/article/Table";
import Pagination from "components/common/Pagination";
import DefaultLayout from "layouts/DefaultLayout";
import axios from "axios";
import { globalPath } from "globalPaths";
import { useNavigate } from "react-router-dom";

const url = globalPath.path;

const List = () => {
  const [articleCate, setArticleCate] = useState([]);
  const [cateValue, setCateValue] = useState("자유게시판");
  const [articleList, setArticleList] = useState([]);
  const [total, setTotal] = useState("");
  const navigate = useNavigate();

  /** 페이지네이션 useState */
  const [postsPerPage, setpostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/article/cate`);
      setArticleCate(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    const data = {
      cateName: cateValue,
      pg: currentPage, // 서버 페이지 인덱스가 0부터 시작하는 경우
      size: postsPerPage,
    };

    try {
      const response = await axios.post(`${url}/article/list`, data);
      setArticleList(response.data.dtoList);
      setTotalPosts(response.data.total);
      setpostsPerPage(response.data.size);
      console.log(response.data);
      setTotal(response.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [cateValue, currentPage, postsPerPage]);

  const handlePageNum = (pageNumber) => setCurrentPage(pageNumber);

  const handleWrite = () => {
    navigate("/article/register");
  };

  const searchKeyword = async (keyword) => {
    const data = {
      cateName: cateValue,
      pg: currentPage, // 서버 페이지 인덱스가 0부터 시작하는 경우
      size: postsPerPage,
      searchKeyword: keyword,
      searchType: "title",
    };

    try {
      const response = await axios.post(`${url}/article/list`, data);
      setArticleList(response.data.dtoList);
      setTotalPosts(response.data.total);
      setpostsPerPage(response.data.size);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DefaultLayout>
      <div className="boardContainer">
        <h2>게시판 목록</h2>
        <BoardTabs
          articleCate={articleCate}
          setCateValue={setCateValue}
          fetchCategories={fetchCategories}
        />
        <Search searchKeyword={searchKeyword} />
        <button onClick={handleWrite}>글쓰기</button>
        <Table
          articleList={articleList}
          fetchArticles={fetchArticles}
          totalPosts={totalPosts}
          total={total}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          paginate={handlePageNum}
        />
      </div>
    </DefaultLayout>
  );
};

export default List;
