import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  display: flex;
  list-style: none;
  text-align: center;
  padding: 1px;
  border-top: 3px solid #0c1425;
  border-bottom: 3px solid #0c1425;
  justify-content: center;
  margin: 20px 0;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  // 페이지 번호 생성
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi
              key={number}
              onClick={() => paginate(number)}
              className="page-item"
            >
              <PageSpan className="page-link">{number}</PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;
