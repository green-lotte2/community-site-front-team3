// index.js
import React, { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tool";

const ReactEditorJS = createReactEditorJS();

const Editor = () => {

  const editorJS = useRef(null);
  const handleInitialize = useCallback((instance) => {
    editorJS.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorJS.current.save();
    console.log(savedData);
  }, []);

  return (
    <div className="Editor">
      <h1 class="pageTitle" spellcheck="true" placeholder="제목 없음" contentEditable="true"></h1>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        defaultValue={
          {blocks: [
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
          ]}
        }
        onInitialize={handleInitialize}
      />
      </div>
  );
};

export default Editor;