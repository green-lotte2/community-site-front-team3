import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { globalPath } from "globalPaths";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "title", headerName: "제목", width: 200 },
  { field: "uid", headerName: "작성자", width: 200 },
  { field: "content", headerName: "내용", width: 400 },
  { field: "cate", headerName: "카테고리", width: 90 },
  { field: "rdate", headerName: "작성날짜", width: 90 },
];

const url = globalPath.path;

export default function DataTable() {
  const [csContent, setCsContent] = useState([]);

  const rows = csContent.map((contents, index) => ({
    id: index + 1,
    uid: contents.uid,
    title: contents.title,
    content: contents.content,
    cate: contents.cateName,
    rdate: contents.rdate,
  }));

  useEffect(() => {
    axios
      .get(`${url}/cs/selects`)
      .then((response) => {
        console.log(response.data);
        setCsContent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
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
