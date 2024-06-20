import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { globalPath } from "globalPaths";
import axios from "axios";
import { useSelector } from "react-redux";

const url = globalPath.path;

const BoardTabs = ({ articleCate, setCateValue, fetchCategories }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [newCateName, setNewCateName] = useState("");
  const [CateName, setCateName] = useState(false);
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.uid;

  // 사용자 조회
  useEffect(() => {
    axios
      .get(`${url}/article/userInfo?uid=${uid}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  // 카테고리 선택
  const handlerClickCate = (e) => {
    setCateValue(e);
  };

  // 카테고리 추가
  const handleAddCate = () => {
    if (newCateName.trim() === "") return;
    const categoryData = {
      uid: uid,
      cateName: newCateName,
    };
    axios
      .post(`${url}/article/cate/add`, categoryData)
      .then(() => {
        setNewCateName("");
        setCateName(false);
        fetchCategories(); // 새로운 카테고리를 가져오도록 호출
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="BoardTabs">
        {articleCate && articleCate.length > 0 ? (
          articleCate.map((cate, index) => (
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
          ))
        ) : (
          <p>카테고리가 없습니다.</p>
        )}

        {userInfo && userInfo.grade === "MVP" && (
          <>
            {CateName ? (
              <div>
                <input
                  type="text"
                  value={newCateName}
                  onChange={(e) => setNewCateName(e.target.value)}
                />
                <button onClick={handleAddCate}>추가</button>
                <button onClick={() => setCateName(false)}>취소</button>
              </div>
            ) : (
              <Link to="#" className="active" onClick={() => setCateName(true)}>
                +
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BoardTabs;
