import React from "react";
import { useEffect, useState } from "react";
import Moment from "moment";
import "moment/locale/ko";
import axios from "axios";
import { globalPath } from "globalPaths";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "글번호", width: 55 },
  { field: "title", headerName: "제목", width: 400 },
  { field: "uid", headerName: "작성자", width: 150 },
  { field: "content", headerName: "내용", width: 550 },
  { field: "cate", headerName: "카테고리", width: 120 },
  { field: "rdate", headerName: "작성날짜", width: 200 },
];

const url = globalPath.path;

const ListComponent = ({ csContent, setSelectedRows }) => {
  /**리스트 테이블에 값 할당 */
  const rows = csContent.map((contents, index) => {
    const modifyDate = Moment(contents.rdate);
    return {
      id: contents.csNo,
      uid: contents.uid,
      title: contents.title,
      content: contents.content,
      cate: contents.cateName,
      rdate: modifyDate.subtract(1, "months").format("YYYY-MM-DD"), // 달을 한달 뺴주고, 형식을 yyyy-mm-dd로
    };
  });

  const handlerSelectionChange = (select) => {
    setSelectedRows(select);
  };

  return (
    <div>
      <DataGrid
        style={{ display: "flex" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        pagination
        onRowSelectionModelChange={handlerSelectionChange}
      />
    </div>
  );
};

export default ListComponent;
