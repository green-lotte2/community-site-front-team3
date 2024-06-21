import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { globalPath } from "globalPaths";
import axios from "axios";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";

const url = globalPath.path;

const BoardTabs = ({ articleCate, setCateValue, fetchCategories }) => {
  const [newCateName, setNewCateName] = useState("");
  const [CateName, setCateName] = useState(false);
  const [value, setValue] = useState("0");
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.uid;
  const grade = authSlice.grade;

  // 카테고리 선택
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (articleCate && articleCate[newValue]) {
      setCateValue(articleCate[newValue].cateName);
    }
  };

  useEffect(() => {
    console.log(grade);
  }, [grade]);

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
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="board tabs">
            {articleCate && articleCate.length > 0 ? (
              articleCate.map((cate, index) => (
                <Tab label={cate.cateName} value={String(index)} key={index} />
              ))
            ) : (
              <Tab label="카테고리가 없습니다." disabled />
            )}
            {grade === "MVP" &&
              (CateName ? (
                <div>
                  <TextField
                    label="생성할 게시판 이름"
                    id="outlined-size-small"
                    defaultValue="Small"
                    size="small"
                    value={newCateName}
                    onChange={(e) => setNewCateName(e.target.value)}
                  />
                  <button className="btnAddArt" onClick={handleAddCate}>추가</button>
                  <button className="btnAddCancel" onClick={() => setCateName(false)}>취소</button>
                </div>
              ) : (
                <Tab label="+" onClick={() => setCateName(true)} />
              ))}
          </TabList>
        </Box>
        {articleCate &&
          articleCate.length > 0 &&
          articleCate.map((cate, index) => (
            <TabPanel
              value={String(index)}
              key={index}
              sx={{ display: "none" }}
            >
              {cate.cateName}
            </TabPanel>
          ))}
      </TabContext>
    </Box>
  );
};

export default BoardTabs;
