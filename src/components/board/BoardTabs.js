import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { globalPath } from "globalPaths";
import axios from "axios";
import { useSelector } from "react-redux";

const url = globalPath.path;

const BoardTabs = ({ articleCate, setCateValue, articleList }) => {
  const [userInfo, setUserInfo] = useState(null);
  const authStlice = useSelector((state) => state.authSlice);

  useEffect(() => {
    const uid = authStlice.uid;
    axios
      .get(`${url}/article/userInfo?uid=${uid}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlerClickCate = (e) => {
    setCateValue(e);
  };
  return (
    <>
      <div className="BoardTabs">
        {articleCate.map((cate, index) => {
          return (
            <Link
              onClick={() => {
                handlerClickCate(cate.cateName);
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

        {userInfo && userInfo.grade === "MVP" && (
          <Link to="#" className="active">
            +
          </Link>
        )}
      </div>
    </>
  );
};

export default BoardTabs;
