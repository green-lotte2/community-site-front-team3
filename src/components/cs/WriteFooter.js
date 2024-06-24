import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LuMailQuestion } from "react-icons/lu";
import { globalPath } from "globalPaths";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector } from "react-redux";

const WriteFooter = ({ cate, title, getContent, content }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

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

  const url = globalPath.path;
  const uid = authSlice.uid;

  /** Base64 -> 파일 blockDataUrl => imgTag*/
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

  /**전송 버튼 두 번 눌러야하는 현상 때문에 trigger변경 */
  const handleSubmitFile = async () => {
    await getContent();
    setTriggerSubmit(true);
  };

  /** triggerSubmit 변경과 동시에 업로드 File DB 전송 */
  useEffect(() => {
    if (!triggerSubmit) return;

    if (content === null || content.trim() === "") {
      alert("내용을 작성하세요");
      setTriggerSubmit(false);
      return;
    }
    if (!cate || cate.trim() === "") {
      alert("문의 카테고리를 선택하세요");
      setTriggerSubmit(false);
      return;
    }
    if (!title || title.trim() === "") {
      alert("제목을 작성하세요");
      setTriggerSubmit(false);
      return;
    }

    let match;

    const matchSrc = /src="([^"]*)"/g;
    const formData = new FormData();
    var contents;

    //**이미지가 있을 때 */
    while ((match = matchSrc.exec(content)) !== null) {
      console.log("이미지 src : " + match[1]);

      const extension = match[1].split("/")[1].split(";")[0]; // 확장자
      const sName = `image_${uuidv4()}.${extension}`;

      const imgFiles = base64ToFile(match[1], sName);
      console.log(match[1]);

      const imageURL = `@FilePath###/uploads/${sName}`;

      contents = content.replace(match[1], imageURL);

      console.log(contents);

      formData.append("imgFiles", imgFiles);
      console.log(content);
      axios
        .post(`${url}/cs/upload`, formData, {
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

      const jsonData = {
        uid: uid,
        cate: cate,
        title: title,
        content: contents,
      };

      console.log(jsonData);

      axios
        .post(`${url}/cs/insert`, jsonData)
        .then((response) => {
          console.log(response.data);
          alert("글이 작성되었습니다.");
          window.location.href = "/main";
        })
        .catch((err) => {
          console.log(err);
          alert("글이 작성되지 않았습니다. 잠시 후 시도해주세요");
        });
    }

    //**이미지가 없을 때 */
    if (!(match = matchSrc.exec(content))) {
      const jsonData = {
        uid: uid,
        cate: cate,
        title: title,
        content: content,
      };

      console.log(jsonData);

      axios
        .post(`${url}/cs/insert`, jsonData)
        .then((response) => {
          console.log(response.data);
          alert("글이 작성되었습니다.");
          window.location.href = "/main";
        })
        .catch((err) => {
          console.log(err);
          alert("글이 작성되지 않았습니다. 잠시 후 시도해주세요");
        });
    }

    setTriggerSubmit(false);
  }, [triggerSubmit, content, url]);

  // useEffect(() => {
  //   console.log("전송할 작성글:", content);
  // }, [content]);

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
