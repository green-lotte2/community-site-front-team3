import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
const WriteComponent = ({ editorRef }) => {
  return (
    <div>
      {" "}
      <div id="editor" ref={editorRef}></div>
    </div>
  );
};

export default WriteComponent;
