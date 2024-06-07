import React, { useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

const Write = ({ editorRef }) => {
  return (
    <div className="Write">
      <div id="editor" ref={editorRef}></div>
    </div>
  );
};

export default Write;
