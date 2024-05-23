import React from "react";

const Table = ({articleList}) => {
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
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>#4612</td>
              <td>
                Jordan Stevenson
                <br />
                j.stevenson@example.com
              </td>
              <td>22 Oct 2019</td>
              <td>
                <span className="paid">Paid</span>
              </td>
              <td>
                <button>...</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
