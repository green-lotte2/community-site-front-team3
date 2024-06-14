import React from "react";
import { Link } from "react-router-dom";

const BoardTabs = ({ articleCate, setCateValue }) => {
  const handlerClickCate = (e) => {
    setCateValue(e);
  };

  return (
    <>
      <div className="BoardTabs">
        {articleCate.map((cate, index) => (
          <Link
            onClick={() => {
              handlerClickCate(cate.cateName);
            }}
            to="#"
            key={index}
            className="active"
          >
            {cate.cateName}
          </Link>
        ))}

        <Link to="#" className="active">
          +
        </Link>
      </div>
    </>
  );
};

export default BoardTabs;
