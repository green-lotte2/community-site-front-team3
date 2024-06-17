import React from "react";
import { Link } from "react-router-dom";

const BoardTabs = ({ articleCate, setCateValue }) => {
  const handlerClickCate = (e) => {
    setCateValue(e);
  };

  console.log(articleCate);
  return (
    <>
      <div className="BoardTabs">
        {articleCate.map((cate, index) => {
          return (
            <Link
              onClick={() => {
                handlerClickCate();
              }}
              to="#"
              className="active"
              value={cate.cateName}
              key={index}
            >
              {cate.cateName}
            </Link>
          );
        })}

        <Link to="#" className="active">
          +
        </Link>
      </div>
    </>
  );
};

export default BoardTabs;
