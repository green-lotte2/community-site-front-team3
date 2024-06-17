import React from "react";

const Table = ({ articleList }) => {
  return (
    <>
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>번호</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {/* {articleList.map((List, index) => (
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td key={index}>{List.ano}</td>
                <td key={index}>
                  {List.uid}
                  <br />
                  j.stevenson@example.com
                </td>
                <td>22 Oct 2019</td>
                <td>
                  <span className="paid">Paid</span>
                </td>
                <td>
                  <button>수정</button>
                  <button>삭제</button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
