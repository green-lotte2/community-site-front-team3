import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "layouts/DefaultLayout";
import Write from "components/cs/Write";
import WriteHeader from "components/cs/WriteHead";
import WriteFooter from "components/cs/WriteFooter";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import Editor from "@toast-ui/editor";
import axios from "axios";
import { globalPath } from "globalPaths";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const url = globalPath.path;

const WritePage = () => {
  const [content, setContent] = useState("");
  const [cate, setCate] = useState("");
  const [title, setTitle] = useState("");
  const editorRef = useRef();
  const editorInstance = useRef();
  const uid = useSelector((state) => state.authSlice.uid);
  const navigate = useNavigate();

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  useEffect(() => {
    const editor = new Editor({
      el: editorRef.current,
      toolbarItems: toolbarItems,
      height: "700px",
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      theme: "light",
    });

    editorInstance.current = editor;

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  const getContent = async () => {
    if (editorInstance.current) {
      const writeContent = editorInstance.current.getHTML();
      setContent(writeContent);
    } else {
      console.log("Editor instance is Not Current");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorInstance.current.getHTML();
    try {
      await axios.post(`${url}/articles`, {
        title,
        content,
        uid,
        cateName: cate,
      });
      navigate("/article/list");
    } catch (err) {
      console.error("Failed to submit article:", err);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <WriteHeader />
        <form onSubmit={handleSubmit}>
          <Write
            setCate={setCate}
            setTitle={setTitle}
            editorRef={editorRef}
            editorInstance={editorInstance}
          />
          <WriteFooter
            cate={cate}
            title={title}
            getContent={getContent}
            content={content}
          />
        </form>
      </div>
    </DefaultLayout>
  );
};

export default WritePage;
