import React, { useCallback, useEffect, useRef, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tool";
import { globalPath } from "globalPaths";
import axios from "axios";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, PartialBlock } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

const path = globalPath.path;
const serverHost = globalPath.serverHost;

const Editor = ({ pageNo, setTitleStat }) => {
  const editorRef   = useRef(null);
  const titleRef    = useRef(null);
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 로딩 여부
  const [currentPageNo, setCurrentPageNo] = useState(pageNo); // 현재 페이지 번호 상태
  const [initialContentLoaded, setInitialContentLoaded] = useState(false);

  console.log("Editor pageNo : ", pageNo);

  const doc = new Y.Doc();
  const provider = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 WebrtcProvider를 생성합니다.
    provider.current = new WebrtcProvider(`page${pageNo}`, doc, {
      signaling: [`ws://${serverHost}:8080/ws/crdt`],
    });

    // 협업 제공자가 준비되었을 때 초기 콘텐츠를 설정합니다.
    provider.current.on("synced", () => {
      if (!initialContentLoaded) {
        setInitialContentLoaded(true);
      }
    });

    // 컴포넌트가 언마운트될 때 provider를 정리합니다.
    return () => {
      provider.current.destroy();
    };
  }, [pageNo]);

    /** 현재 페이지 번호 불러오기 */
    useEffect(() => {
      setCurrentPageNo(pageNo);
    }, [pageNo]);
  
    /** 페이진 정보 불러오기 */
    useEffect(() => {
      const fetchPageData = async () => {
        try {
          const respPage = await axios.get(
            `${path}/page?pageNo=${currentPageNo}`
          );
          setTitle(respPage.data.title);
          setUid(respPage.data.uid);
          setBlocks(respPage.data.content);
          console.log("ggg : ", respPage.data);
        } catch (error) {
          console.error("Error fetching page data: ", error);
        }
      };
      fetchPageData();
    }, [currentPageNo]);


  /** 에디터 생성 */
  const editor = useCreateBlockNote({
    defaultStyles: true,
    collaboration: {
      provider: provider.current,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: "My Username",
        color: "#ff0000",
      },
    },
    uploadFile,
  });

  /** 데이터 입력시 blocks에 추가 */
  const editorSelectHandler = () => {
    const selection = editor.getSelection();
    // block 변수 state
    if (selection !== undefined) {
      setBlocks(selection.blocks);
    } else {
      setBlocks([editor.getTextCursorPosition().block]);
    }
    // 로컬 스토리지에 전체 블록 업데이트
    const allBlocks = editor.document;
    saveToStorage(allBlocks);
  };

  /** 로컬 스토리지에 저장 */
  async function saveToStorage(jsonBlocks) {
    localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
  }

  /** 로컬 스토리지에서 불러오기 */
  async function loadFromStorage() {
    const storageString = localStorage.getItem("editorContent");
    return storageString ? JSON.parse(storageString) : undefined;
  }

  /** 페이지 로드될 때 스토리지에서 꺼내와서 editor 업데이트 */
  useEffect(() => {
    const loadBlocksFromStorage = async () => {
      const storedBlocks = await loadFromStorage();
      if (storedBlocks && editor) {
        const referenceBlock = editor.document[0]?.id || null;
        if (referenceBlock) {
          editor.insertBlocks(storedBlocks, referenceBlock, "before");
        } else {
          editor.insertBlocks(storedBlocks, null, "nested");
        }
        setBlocks(storedBlocks); // 로드된 블록을 상태에 저장
      }
    };

    if (initialContentLoaded) {
      loadBlocksFromStorage();
    }
  }, [initialContentLoaded, editor]);

  /** 블록 저장 */
  const handleSave = async () => {
    const storedBlocks = await loadFromStorage();
    console.log("저장 할 블록들 : ", JSON.stringify(storedBlocks, null, 2));
    try {
      const resp = await axios.post(`${path}/savepage`, {
        content: JSON.stringify(storedBlocks),
        uid: uid,
        pageNo: pageNo,
        title: title,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response:", resp);
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };
  
  /** 파일 업로드 */
  async function uploadFile(file) {
    const body = new FormData();
    body.append("file", file);

    const resp = await axios.post(`${path}/page/upload`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const sName = resp.data; // 서버가 반환한 이미지 URL
    console.log("파일 전송 성공 sName : ", sName);
    const src = path + "/uploads/" + sName;
    console.log("file 경로 : ", src);
    return src;
  }

  /** 블록값 확인 */
  useEffect(() => {
    const allBlocks = editor.document;
    console.log(allBlocks);
  }, [blocks]);


  // 데이터 로딩중이면 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  /** 제목 입력 */
  const handleInputTitle = (e) => {
    // isComposing : 입력 문자가 조합 문자인지 아닌지를 boolean값으로 반환
    if (e.nativeEvent.isComposing) {
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;

    setTitle(e.target.innerText);

    /** 입력 커서 위치 설정 */
    setTimeout(() => {
      range.setStart(range.startContainer, startOffset);
      range.setEnd(range.startContainer, startOffset);
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  };

  return (
    <div className="Editor">
      <h1
        className="pageTitle"
        spellCheck="true"
        placeholder="제목 없음"
        contentEditable="true"
        onInput={handleInputTitle}
        ref={titleRef}
      >
        {title}
      </h1>
      <BlockNoteView
        editor={editor}
        onSelectionChange={editorSelectHandler}
        theme="light"
      />
      <button  onClick={handleSave}>임시 저장 버튼 ! </button>
      <div>Selection JSON:</div>
      <div className={"item bordered"}>
        <pre>
          <code>{JSON.stringify(blocks, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default Editor;
