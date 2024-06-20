import axios from "axios";
import { globalPath } from "globalPaths";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const MainRecentArticles = () => {
  const url = globalPath.path;
  const [articleList, setArticleList] = useState([]);
  const scrollContainerRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/admin/article`);
      setArticleList(response.data.slice(0, 5)); // 최대 5개로 제한
    };
    fetchData();
  }, [url]);

  // 스크롤, 버튼 생성
  useEffect(() => {
    const checkScroll = () => {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      if (direction === "left") {
        current.scrollLeft -= 450;
      } else {
        current.scrollLeft += 450;
      }
    }
  };

  // 게시글 내용 글 제한 수 이후 ... 출력
  const cutContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <div>
      <h4 className="main-h3-title">
        <AssignmentIcon />
        최근 게시글
      </h4>
      <div className="scroll-wrapper">
        <IconButton
          className={`scroll-button scroll-button-left ${
            !showScrollButtons ? "scroll-button-hidden" : ""
          }`}
          onClick={() => scroll("left")}
        >
          <ArrowBackIos />
        </IconButton>
        <div className="scroll-container" ref={scrollContainerRef}>
          {articleList.map((article) => (
            <div className="scroll-article" key={article.ano}>
              <Card className="main-article-card" sx={{ minHeight: 155 }}>
                <CardContent>
                  <Typography
                    className="main-eventList-title"
                    variant="h6"
                    component="h2"
                  >
                    제목: {article.title}
                  </Typography>
                  <Typography
                    className="main-eventList-article"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  ></Typography>
                  <Typography className="main-article">
                    등록일: {moment(article.rdate).format("YY-MM-DD")}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <IconButton
          className={`scroll-button scroll-button-right ${
            !showScrollButtons ? "scroll-button-hidden" : ""
          }`}
          onClick={() => scroll("right")}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
    </div>
  );
};
export default MainRecentArticles;
