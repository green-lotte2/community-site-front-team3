import React, { useEffect, useState } from "react";
import BoardTabs from "../../components/board/BoardTabs";
import Search from "../../components/board/Search";
import Table from "../../components/board/Table";
import Pagination from "components/common/Pagination";
import DefaultLayout from "layouts/DefaultLayout";
import axios from "axios";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const List = () => {
  const [articleCate, setArticleCate] = useState([]);
  const [cateValue, setCateValue] = useState("자유게시판");
  const [articleList, setArticleList] = useState([]);

  /** 페이지네이션 useState */
  const [postsPerPage, setpostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState("");
  const [paginate, setPaginate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //const [page]
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
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/article/list`, {
          params: {
            cateName: cateValue,
            page: currentPage - 1, // 서버 페이지 인덱스가 0부터 시작하는 경우
            size: postsPerPage,
          },
        });
        console.log("List", response.data);
        setArticleList(response.data.dtoList);
        setTotalPosts(response.data.total);
      } catch (err) {
        console.log(err);
      }
    };
    fetchArticles();
  }, [cateValue, currentPage, postsPerPage]);

  useEffect(() => {
    console.log("클릭시 카테" + cateValue);
    console.log(
      "클릭시 카테 주소" + `${url}/article/list?cateName=${cateValue}`
    );

    axios
      .get(`${url}/article/list?cateName=${cateValue}`)
      .then((response) => {
        console.log("List", response.data);
        setArticleList(response.data.dtoList);
        setpostsPerPage(response.data.size);
        setTotalPosts(response.data.total);
        setPaginate(response.data.start);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cateValue]);

  useEffect(() => {
    console.log(articleList);
  }, [articleList]);

  const handlePageNum = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <div className="boardContainer">
        <h2>게시판 목록</h2>
        <BoardTabs
          articleCate={articleCate}
          setCateValue={setCateValue}
          articleList={articleList}
        />
        <Search />
        <Table articleList={articleList} />
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
