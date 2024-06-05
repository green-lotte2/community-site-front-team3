import React, { useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

const Write = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      new Editor({
        el: editorRef.current,
        height: "500px",
        initialEditType: "wysiwyg",
        previewStyle: "tab",
      });
    }
  }, []);

  return (
    <div className="Write">
      <div id="editor" ref={editorRef}></div>
    </div>
  );
};

export default Write;
