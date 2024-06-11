import React, { useCallback, useEffect, useRef, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tool";
import { globalPath } from "globalPaths";
import axios from "axios";

const path = globalPath.path;

const Editor = ({ pageNo, setTitleStat }) => {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 로딩 여부
  const [currentPageNo, setCurrentPageNo] = useState(pageNo); // 현재 페이지 번호 상태

  console.log("Editor pageNo : ", pageNo);

  /** 현재 페이지 번호 불러오기 */
  useEffect(() => {
    setCurrentPageNo(pageNo);
  }, [pageNo]);

  /** 제목 불러오기 */
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const respPage = await axios.get(`${path}/page?pageNo=${currentPageNo}`);
        setTitle(respPage.data.title);
        console.log("ggg : ", respPage.data);
      } catch (error) {
        console.error("Error fetching page data: ", error);
      }
    };
    fetchPageData();
  }, [currentPageNo]);

  /** 블록 불러오기 */
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const respBlock = await axios.get(`${path}/block?pageNo=${currentPageNo}`);
        console.log("블록 불러오기 : ", respBlock.data);

        // data 필드를 JSON 객체로 변환
        const transformedBlocks = respBlock.data.map(block => {
          try {
            let formattedData = block.data
              .replace(/(\w+)=/g, '"$1":') // key=value 형식을 "key":"value" 형식으로 변환
              .replace(/,(\s*)(\w+)=/g, ',"$2":') // key=value 형식을 "key":"value" 형식으로 변환
              .replace(/'/g, '"');         // 작은 따옴표를 큰 따옴표로 변환

            formattedData = formattedData.replace(/"(\w+)":([^",\s\}]+)/g, '"$1":"$2"');
            formattedData = formattedData.replace(/"url":"(http[^"]+)"/g, '"url":"$1"');
            formattedData = formattedData.replace(/"caption":"([^"]+)"/g, '"caption":"$1"');
            formattedData = formattedData.replace(/"withBorder":"(false|true)"/g, '"withBorder":$1');
            formattedData = formattedData.replace(/"withBackground":"(false|true)"/g, '"withBackground":$1');
            formattedData = formattedData.replace(/"stretched":"(false|true)"/g, '"stretched":$1');

            block.data = JSON.parse(formattedData);

          } catch (error) {
            console.error("JSON 변환 오류: ", error, block.data);
          }
          return block;
        });

        setBlocks(transformedBlocks || []); // 데이터가 없으면 빈 배열로 설정
        setLoading(false); // 로딩 상태 해제
      } catch (error) {
        console.error("블록 불러오기 오류 : ", error);
        setLoading(false);
      }
    };
    setBlocks([]); // pageNo 변경 시 블록 초기화
    setLoading(true); // 로딩 상태 설정
    fetchPageData();

    /** unmount 될 때 저장 */
    return () => {
      handleSave();
    };

  }, [currentPageNo]);

  // Editor 생성
  const ReactEditorJS = createReactEditorJS({
    holder: "editor-container",
    data: blocks,
  });

  // Editor.js 초기화 핸들러
  const handleInitialize = useCallback((instance) => {
    editorRef.current = instance;
  }, []);

  /** 저장하기 */
  const handleSave = useCallback(async () => {
    console.log("저장 시작 ~ ");

    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        console.log("Article data: ", outputData);

        const formData = new FormData();

        /** block 반복해서 이미지 블록 처리 */
        const processedBlocks = await Promise.all(
          outputData.blocks.map(async (block, index) => {
            console.log(block)

            // 이미지 블록이면
            if (
              block.type === "image" &&
              block.data.url.startsWith("data:image")
            ) {
              const imgFile = base64ToFile(
                block.data.url,
                `image_${index}.png`
              );

              const formData2 = new FormData();

              formData2.append("imgFile", imgFile);
              console.log(formData2);
              // 파일 객체 전송 및 저장명 받기
              try {
                const resp = await axios.post(
                  `${path}/page/upload`,
                  formData2,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );

                const sName = resp.data; // 서버가 반환한 이미지 URL
                console.log("파일 전송 성공 sName : ", sName);
                console.log(
                  "파일 전송 성공 url : ",
                  `${path}/uploads/${sName}`
                );
                // URL을 사용하여 블록 데이터 업데이트
                return {
                  ...block,
                  data: {
                    ...block.data,
                    url: `/uploads/${sName}`,
                  },
                  bno: block.bno, // bno 추가
                  order: index,
                };
              } catch (err) {
                console.error("파일 전송 실패: ", err);
                throw new Error(`Image upload failed for block index ${index}`);
              }
            }

            // 이미지 블록이 아니면
            return { ...block, bno: block.bno, order: index }; // bno 추가
          })
        );

        /** 이미지 변환 한 후 formData 저장 */
        const dataWithoutBase64 = {
          ...outputData,
          blocks: processedBlocks,
        };

        formData.append("data", JSON.stringify(dataWithoutBase64));
        formData.append("pageNo", currentPageNo);
        formData.append("title", title);

        console.log("title: ", title);
        console.log("formData: ", formData);
        console.log("pageNo: ", currentPageNo);

        /** 본문 내용 전체 저장 */
        const response = await fetch(`${path}/savepage`, {
          method: "POST",
          body: formData,
        });
        setTitleStat(title);
        console.log("Saving response: ", response);
      } catch (error) {
        console.error("Saving failed: ", error);
      }
    }
  }, [editorRef, path, currentPageNo, title]);

  /** Base64 -> 파일 */
  const base64ToFile = (blockDataUrl, fileName) => {
    const dataUrlArr = blockDataUrl.split(",");
    const mime = dataUrlArr[0].match(/:(.*?);/)[1];
    const bstr = atob(dataUrlArr[1]); // atob : Base64 decode
    let n = bstr.length;

    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // 데이터 로딩중이면 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  /** 제목 입력 */
  const handleInputTitle = (e) => {

    // isComposing : 입력 문자가 조합 문자인지 아닌지를 boolean값으로 반환
    if (e.nativeEvent.isComposing) {
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;

    setTitle(e.target.innerText);

    /** 입력 커서 위치 설정 */
    setTimeout(() => {
      range.setStart(range.startContainer, startOffset);
      range.setEnd(range.startContainer, startOffset);
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);

  };

  return (
    <div className="Editor">
      <h1
        className="pageTitle"
        spellCheck="true"
        placeholder="제목 없음"
        contentEditable="true"
        onInput={handleInputTitle}
        ref={titleRef}
      >
        {title}
      </h1>
      <div id="test">
        <ReactEditorJS
          tools={EDITOR_JS_TOOLS}
          onInitialize={handleInitialize}
          data={{ blocks: blocks }}
        />
      </div>
      <button onClick={handleSave}>저장</button>
    </div>
  );
};

export default Editor;
