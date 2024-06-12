import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "title", headerName: "제목", width: 200 },
  { field: "uid", headerName: "작성자", width: 200 },
  { field: "content", headerName: "내용", width: 400 },
  { field: "cate", headerName: "카테고리", width: 90 },
  { field: "rdate", headerName: "작성날짜", width: 90 },
];

const rows = [
  {
    id: 1,
    uid: "김땡땡",
    title: "Snow",
    content: "Jon",
    cate: 35,
    rdate: "24.06.12",
  },
  {
    id: 2,
    uid: "김땡땡",
    title: "Lannister",
    content: "Cersei",
    cate: 42,
    rdate: "24.06.12",
  },
  {
    id: 3,
    uid: "김땡땡",
    title: "Lannister",
    content: "Jaime",
    cate: 45,
    rdate: "24.06.12",
  },
  {
    id: 4,
    uid: "김땡땡",
    title: "Stark",
    content: "Arya",
    cate: 16,
    rdate: "24.06.12",
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
