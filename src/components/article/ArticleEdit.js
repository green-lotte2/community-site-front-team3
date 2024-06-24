import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { globalPath } from "globalPaths";
import { useSelector } from "react-redux";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import Editor from "@toast-ui/editor";
import { v4 as uuidv4 } from "uuid";

const url = globalPath.path;

const ArticleEdit = () => {
  const { ano } = useParams();
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const editorRef = useRef();
  const editorInstance = useRef();
  const uid = useSelector((state) => state.authSlice.uid);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  useEffect(() => {
    const editor = new Editor({
      el: editorRef.current,
      toolbarItems: [
        ["heading", "bold", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["image"],
        ["table", "link"],
      ],
      height: "700px",
      initialEditType: "wysiwyg",
      previewStyle: "tab",
    });

    editorInstance.current = editor;

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  // ano 값이 변할때마다 게시글을 불러옴
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${url}/articles/${ano}`);
        setArticle(response.data);
        if (editorInstance.current) {
          editorInstance.current.setHTML(response.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch the article:", error);
      }
    };
    fetchArticle();
  }, [ano]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const base64ToFile = (blockDataUrl, fileName) => {
    const dataUrlArr = blockDataUrl.split(",");
    const mime = dataUrlArr[0].match(/:(.*?);/)[1];
    const bstr = atob(dataUrlArr[1]); // atob : Base64 decode
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setTriggerSubmit(true);
  };

  useEffect(() => {
    if (!triggerSubmit) return;

    const getContent = async () => {
      if (editorInstance.current) {
        const writeContent = editorInstance.current.getHTML();
        setArticle((prevState) => ({ ...prevState, content: writeContent }));

        let match;
        const matchSrc = /src="([^"]*)"/g;
        const formData = new FormData();
        let contents = writeContent;

        while ((match = matchSrc.exec(writeContent)) !== null) {
          const extension = match[1].split("/")[1].split(";")[0]; // 확장자
          const sName = `image_${uuidv4()}.${extension}`;

          const imgFiles = base64ToFile(match[1], sName);
          const imageURL = `@FilePath###/uploads/${sName}`;
          contents = contents.replace(match[1], imageURL);
          formData.append("imgFiles", imgFiles);
        }

        if (formData.has("imgFiles")) {
          await axios.post(`${url}/cs/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        const articleData = {
          uid: uid,
          title: article.title,
          content: contents,
        };

        try {
          await axios.put(`${url}/articles/${ano}`, articleData);
          alert("글이 수정되었습니다.");
          navigate("/article/list");
        } catch (error) {
          alert("글이 수정되지 않았습니다. 잠시 후 시도해주세요.");
        }
      }
    };

    getContent();
    setTriggerSubmit(false);
  }, [triggerSubmit, article.title, uid, ano, navigate]);

  return (
    <div className="edit-container">
      <h2>게시글 수정</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label aria-readonly>제목</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div id="editor" ref={editorRef}></div>
        </div>
        <button type="submit">저장</button>
        <button type="button" onClick={() => navigate("/article/list")}>
          취소
        </button>
      </form>
    </div>
  );
};

export default ArticleEdit;
