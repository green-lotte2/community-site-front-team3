import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { LuMailQuestion } from "react-icons/lu";

const WriteFooter = ({ getContent, content }) => {
  const button = {
    marginTop: "15px",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
  };

  /**에디터의 내용 가져오기 + DB 전송 */

  const handleSubmit = () => {
    getContent();

    // 이미지 짜를 기준 : ![]
    if (content.includes("![]")) {
      const imgStartIndex = content.indexOf("![]");
      const imgEndIndex = content.indexOf(")", imgStartIndex);

      if (imgEndIndex > imgStartIndex) {
        // 이미지 추출
        const imgTag = content.slice(imgStartIndex + 3, imgEndIndex + 1);

        console.log("이미지 태그 : " + imgTag);
      }
    }
  };

  useEffect(() => {
    //console.log("전송할 작성글:", content);
  }, [content]);

  return (
    <div>
      <section>
        <Button size="large" variant="outlined" href="../" style={button}>
          취소
        </Button>

        <Button
          size="large"
          onClick={handleSubmit}
          variant="outlined"
          style={button}
        >
          문의하기 <LuMailQuestion />
        </Button>
      </section>
    </div>
  );
};

export default WriteFooter;
