// index.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tool";

const Editor = () => {

  const editorRef  = useRef(null);
  const ReactEditorJS = createReactEditorJS({
    holder: 'editorjs',
    data:{
      blocks: [
        
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
      ]
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
    const savedData = await editorRef.current.save();
    console.log('Article data: ', savedData);
  }, []);

  const saveData = async () => {
    if (editorRef.current) {
        try {
            const outputData = await editorRef.current.save();
            console.log('Article data: ', outputData);
            // 서버로 데이터를 전송하거나 데이터베이스에 저장
            // 예: fetch를 사용하여 서버로 전송
            await fetch('/api/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(outputData),
            });
        } catch (error) {
            console.error('Saving failed: ', error);
        }
    }
};

  return (
    <div className="Editor">
      <h1 class="pageTitle" spellcheck="true" placeholder="제목 없음" contentEditable="true"></h1>
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