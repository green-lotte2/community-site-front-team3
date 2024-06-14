import React, { useCallback, useEffect, useRef, useState } from "react";
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

const Editor = ({ pageNo, submitPage }) => {
  const titleRef = useRef(null);

  /** 페이지 정보 보관하는 useRef */
  const pageRef = useRef({
    pageNo: pageNo,
    title: "",
    content: "",
  });

  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(pageNo); // 현재 페이지 번호 상태

  console.log("현재 pageNo : ", pageNo);

  const doc = new Y.Doc();
  const provider = useRef(null);

  /** 에디터 생성 설정 */
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

  useEffect(() => {
    console.log("pageNo 입니다 : ", pageNo);
    // 컴포넌트가 마운트될 때 WebrtcProvider를 생성합니다.
    let roomId = "test" + pageNo;
    provider.current = new WebrtcProvider(roomId, doc, {
      signaling: [`ws://${serverHost}:8080/ws/crdt`],
    });
    // 컴포넌트가 언마운트될 때 provider를 정리합니다.
    return () => {
      submitPage(editor.document, pageRef.current);
      provider.current.destroy();
      // editor.removeBlocks(editor.document); // editor 내용 초기화
    };
  }, [pageNo]);

  /** 현재 페이지 번호 불러오기 */
  //useEffect(() => {
    //setCurrentPageNo(pageNo);
 // }, [pageNo]);

  /** 페이지 정보 불러오기 */
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const respPage = await axios.get(
          `${path}/page?pageNo=${currentPageNo}`
        );
        setTitle(respPage.data.title);
        setUid(respPage.data.uid);
        setBlocks(respPage.data.content); // Page 깡

        console.log("!!@!@!@!@!");
        console.log(respPage.data.content);

        if (editor.document.length === 1) {
          for (let i = 0; i < 1; i++) {
            const docView = JSON.parse(respPage.data.content);
            //editor.insertBlocks(docView, docView[i].id, "after");
            editor.replaceBlocks(editor.document, docView);
            console.log("성공");
          }
        }
      } catch (error) {
        console.error("Error fetching page data: ", error);
      }
    };
    fetchPageData();
  }, [currentPageNo]);

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
  };

  /** 블록 저장 */
  const handleSave = async () => {
    console.log("블록 저장 currentPageNo : ", currentPageNo);

    const allBlocks = editor.document;
    console.log("uid : ", uid);
    console.log("제목? : ", title);
    try {
      const resp = await axios.post(
        `${path}/savepage`,
        {
          content: JSON.stringify(allBlocks),
          uid: uid,
          pageNo: pageNo,
          title: title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  /** 제목 입력 */
  const handleInputTitle = (e) => {
    // isComposing : 입력 문자가 조합 문자인지 아닌지를 boolean값으로 반환
    if (e.nativeEvent.isComposing) {
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;

    console.log("제목 쓰는 중 : ", e.target.innerText);
    setTitle(e.target.innerText);

    pageRef.current.title = e.target.innerText;
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
    </div>
  );
};

export default Editor;
