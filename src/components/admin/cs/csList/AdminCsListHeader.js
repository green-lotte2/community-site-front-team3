import React from "react";

const AdminCsListHeader = ({ view }) => {
  const getTitle = () => {
    switch (view) {
      case "list":
        return "게시할 문의글 목록";

      case "modify":
        return "게시할 문의글 수정";

      case "wirte":
        return "게시할 문의글 작성";

      default:
        return "게시할 문의글 목록";
    }
  };

  return (
    <div>
      <h2
        style={{
          display: "flex",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        {getTitle()}
      </h2>
    </div>
  );
};

export default AdminCsListHeader;
