import React, { useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

const Write = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  const toolbarItems = [
    //["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["image"],
    //["table", "link"],
    //["code", "codeblock"],
    //["scrollSync"],
  ];

  useEffect(() => {
    const editor = new Editor({
      el: editorRef.current,
      toolbarItems: toolbarItems,
      height: "700px",
      initialEditType: "wysiwyg",
      previewStyle: "tab",
    });

    editorInstance.current = editor;
  }, []);

  console.log(editorInstance.current);

  const getContent = () => {
    if (editorInstance.current) {
      const html = editorInstance.current.getInstance();
      console.log(html);
    }
  };
  return (
    <div className="Write">
      <div id="editor" ref={editorRef} onChange={getContent}></div>
    </div>
  );
};

export default Write;
