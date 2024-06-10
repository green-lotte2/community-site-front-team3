import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { LuMailQuestion } from "react-icons/lu";
import { globalPath } from "globalPaths";
import axios from "axios";

const WriteFooter = ({ getContent, content }) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    width: "1500px",
    margin: "0 auto",
  };

  const button = {
    marginTop: "15px",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
  };

  const path = globalPath.path;

  /**에디터의 내용 가져오기 + 업로드 File DB 전송 */
  const handleSubmitFile = () => {
    getContent();

    let match;
    let index = 0;
    const matchSrc = /src="([^"]*)"/g;

    const formData = new FormData();

    while ((match = matchSrc.exec(content)) !== null) {
      console.log("이미지 src : " + match[1]);

      const imgFiles = base64ToFile(match[1], `image_${index++}.png`);

      console.log(imgFiles);
      formData.append("imgFiles", imgFiles);
      axios
        .post(`${path}/cs/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /** Base64 -> 파일
   * blockDataUrl => imgTag
   */
  const base64ToFile = (blockDataUrl, fileName) => {
    const dataUrlArr = blockDataUrl.split(",");
    const mime = dataUrlArr[0].match(/:(.*?);/)[1];
    const bstr = atob(dataUrlArr[1]); // atob : Base64 decode
    let n = bstr.length;
    console.log("mime : " + mime);
    console.log(n);

    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  useEffect(() => {
    console.log("전송할 작성글:", content);
  }, [content]);

  return (
    <div style={style}>
      <section>
        <Button size="large" variant="outlined" href="../" style={button}>
          취소
        </Button>

        <Button
          size="large"
          onClick={handleSubmitFile}
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
