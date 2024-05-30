// index.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tool";
import { globalPath } from "globalPaths";

const path = globalPath.path;

const Editor = () => {
  const editorRef = useRef(null);
  /** 에디터 생성 (기본 블록 포함) */
  const ReactEditorJS = createReactEditorJS({
    holder: "editorjs",
    data: {
      blocks: [
        // 출력할 때 이렇게 하면 될 것 같음
        {
          type: "header",
          data: {
            level: 2, // size
            text: "header",
          },
          config: {
            placeholder: "제목 입력",
          },
        },
        {
          type: "paragraph",
          data: {
            text: "내용을 입력하세요.",
          },
        },
      ],
    },
    onReady: () => {
      editorRef.current = ReactEditorJS;
    },
  });
  const handleInitialize = useCallback((instance) => {
    editorRef.current = instance;
  }, []);

  /** 저장하기 누르면 */
  const handleSave = useCallback(async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        console.log("Article data: ", outputData);

        const formData = new FormData();

        /** block 반복해서 이미지 블록 처리 */
        const processedBlocks = outputData.blocks.map((block, index) => {

          // 이미지 블록이면 
          if (
            block.type === "image" &&
            block.data.url.startsWith("data:image")
          ) {

            const base64Data = block.data.url.split(",")[1];

            /** atob :  base64를 decode */
            const byteCharacters = atob(base64Data);

            /** 각 문자의 ASCII 코드를 저장 */
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            /** ASCII 코드 배열로 Uint8Array(8비트 부호 없는 정수값)를 생성 */
            const byteArray = new Uint8Array(byteNumbers);
            /** Blob 객체를 생성 */
            const file = new Blob([byteArray], { type: "image/png" });

            console.log("Blob 객체 : " + file);
            formData.append(`image_${index}`, file, `image_${index}.png`);
            return {
              ...block,
              data: {
                ...block.data,
                url: `image_${index}.png`, // Placeholder for image file path
              },
            };
          }
          // 이미지 블록이 아니면
          return block;
        });

        /** 이미지 변환 한 후 formData 저장 */
        const dataWithoutBase64Images = {
          ...outputData,
          blocks: processedBlocks,
        };
        formData.append("data", JSON.stringify(dataWithoutBase64Images));
        console.log("formData 22 : ", formData);
        await fetch(`${path}/savepage`, {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.error("Saving failed: ", error);
      }
    }
  }, []);


  return (
    <div className="Editor">
      <h1
        class="pageTitle"
        spellCheck="true"
        placeholder="제목 없음"
        contentEditable="true"
      ></h1>
      <div id="test">
        <ReactEditorJS
          tools={EDITOR_JS_TOOLS}
          onInitialize={handleInitialize}
        />
      </div>
      <button onClick={handleSave}>저장</button>
    </div>
  );
};

export default Editor;
