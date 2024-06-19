import Editor from "@toast-ui/editor";
import DefaultLayout from "layouts/DefaultLayout";
import React, { useEffect, useRef, useState } from "react";
import Write from "components/article/WriteComponent";
const WritePage = () => {
  // 문의글 작성할 때 내용 저장
  const [content, setContent] = useState("");
  // 문의글 작성할 때 선택한 카테고리 저장
  const [cate, setCate] = useState("");
  // 문의글 작성할 때 제목 저장
  const [title, setTitle] = useState("");
  const editorRef = useRef();
  const editorInstance = useRef();

  const toolbarItems = [
    ["heading", "bold", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["image"],
    ["table", "link"],
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

  const getContent = async () => {
    if (editorInstance.current) {
      const writeContent = editorInstance.current.getHTML();
      setContent(writeContent);
    } else {
      console.log("Editor instance is Not Current");
    }
  };

  return (
    <DefaultLayout>
      <div>
        <Write
          setCate={setCate}
          setTitle={setTitle}
          editorRef={editorRef}
          editorInstance={editorInstance}
        />
      </div>
    </DefaultLayout>
  );
};

export default WritePage;
