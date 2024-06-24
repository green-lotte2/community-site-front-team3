import React, { useEffect, useState } from "react";
import BoardTabs from "../../components/article/BoardTabs";
import Search from "../../components/article/Search";
import Table from "../../components/article/Table";
import Pagination from "components/common/Pagination";
import DefaultLayout from "layouts/DefaultLayout";
import axios from "axios";
import { globalPath } from "globalPaths";
import { useNavigate } from "react-router-dom";
import "../../styles/board.scss";

const url = globalPath.path;

const List = () => {
  const [articleCate, setArticleCate] = useState([]);
  const [cateValue, setCateValue] = useState("자유게시판");
  const [articleList, setArticleList] = useState([]);
  const [total, setTotal] = useState("");
  const [pageNo, setPageNo] = useState("");
  const navigate = useNavigate();

  /** 페이지네이션 useState */
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 카테고리 조회
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

  // list 불러오기
  const fetchArticles = async () => {
    const data = {
      cateName: cateValue,
      pg: currentPage,
      size: postsPerPage,
      sort: "desc", // 최신 글이 가장 위로 오도록 설정
    };

    try {
      const response = await axios.post(`${url}/article/list`, data);
      setArticleList(response.data.dtoList);
      setTotalPosts(response.data.total);
      setPostsPerPage(response.data.size);
      setTotal(response.data.total);
      setPageNo(response.data.pg);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [cateValue, currentPage, postsPerPage]);

  // 페이지 번호 받아서 현재 페이지번호 변경하는 역할
  const handlePageNum = (pageNumber) => setCurrentPage(pageNumber);

  // 글 쓰기 페이지 이동
  const handleWrite = () => {
    navigate("/article/register");
  };

  // 검색
  const searchKeyword = async (keyword) => {
    const data = {
      cateName: cateValue,
      pg: currentPage,
      size: postsPerPage,
      searchKeyword: keyword,
      searchType: "title",
    };
    console.log(1);
    try {
      console.log(2);
      const response = await axios.post(`${url}/article/list`, data);
      console.log(3);
      setArticleList(response.data.dtoList);
      setTotalPosts(response.data.total);
      setPostsPerPage(response.data.size);
    } catch (err) {
      console.log(4);
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
        <Table
          articleList={articleList}
          fetchArticles={fetchArticles}
          totalPosts={totalPosts}
          total={total}
          pageNo={pageNo}
        />
        <button className="write-button" onClick={handleWrite}>
          글쓰기
        </button>
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
