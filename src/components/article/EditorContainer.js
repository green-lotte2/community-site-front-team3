import React, { useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

const EditorContainer = ({ text, article }) => {
  const editorRef = useRef();

  const toolbarItems = [
    ["heading", "bold", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["image"],
    ["table", "link"],
  ];

  useEffect(() => {
    const editor = new Editor({
      el: editorRef.current,
      toolbarItems: toolbarItems,
      height: "700px",
      initialEditType: "wysiwyg",
      previewStyle: "tab",
      initialValue: article.content || "", // 게시글 내용을 에디터에 설정
    });

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [article]);

  return (
    <div>
      <h3>{article.title}</h3>
      <div ref={editorRef}></div>
    </div>
  );
};

export default EditorContainer;
