import React from "react";
import Editor from "./Editor";

const EditorContainer = ({ text }) => {
  return (
    <>
      <div className="EditorContainer">
        <Editor />
        <button className="complete-button">{text} 완료</button>
      </div>
    </>
  );
};

export default EditorContainer;
