import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "layouts/DefaultLayout";
import Write from "components/cs/Write";
import WriteHeader from "components/cs/WriteHead";
import WriteFooter from "components/cs/WriteFooter";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import Editor from "@toast-ui/editor";

const WritePage = () => {
  const [content, setContent] = useState("");
  const editorRef = useRef();
  const editorInstance = useRef();

  /**에디터 커스터마이징 하는곳
   * (게시판은 해당 부분 주석 다 없애서 사용해주셔야 할듯!)
   */
  const toolbarItems = [
    //["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["image"],
    //["table", "link"],
    //["code", "codeblock"],
    //["scrollSync"],
  ];

  /** 에디터 객체 생성 */
  useEffect(() => {
    const editor = new Editor({
      el: editorRef.current,
      toolbarItems: toolbarItems,
      height: "700px",
      initialEditType: "wysiwyg",
      previewStyle: "tab",
    });

    editorInstance.current = editor;
    return () => {
      // cleanup
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  const getContent = () => {
    if (editorInstance.current) {
      const writeContent = editorInstance.current.getMarkdown();

      setContent(writeContent);
    } else {
      console.log("Editor instance is Not Current");
    }
  };

  return (
    <DefaultLayout>
      <div>
        <WriteHeader />
        <Write editorRef={editorRef} editorInstance={editorInstance} />
        <WriteFooter getContent={getContent} content={content} />
      </div>
    </DefaultLayout>
  );
};

export default WritePage;
