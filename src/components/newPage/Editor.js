import React, { useCallback, useEffect, useRef, useState } from "react";
import { globalPath } from "globalPaths";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, PartialBlock } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Autocomplete, Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getPartners,
  getUsersByCompany,
  savePage,
  addPartners,
  removePartner,
  deletePage,
  uploadFile,
  getPageData,
} from "api/PageApi";
import { useNavigate } from "react-router-dom";

const serverHost = globalPath.serverHost;

const Editor = ({ pageNo, submitPage, setTitleStat }) => {
  const titleRef = useRef(null);

  /** 페이지 정보 보관하는 useRef */
  const pageRef = useRef({
    pageNo: pageNo,
    title: "",
    content: "",
  });
  const authSlice = useSelector((state) => state.authSlice);
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");
  const [currentPageNo, setCurrentPageNo] = useState(pageNo); // 현재 페이지 번호 상태
  const [modalOpen, setModalOpen] = useState(false);
  /** 초대된 협력자, 선택한 협력자, 같은 회사 사용자 */
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isCurrentUserInvited, setIsCurrentUserInvited] = useState(false);

  console.log("현재 pageNo : ", pageNo);

  const doc = new Y.Doc();
  const provider = useRef(null);
  const navigate = useNavigate();
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
    // 컴포넌트가 마운트될 때 WebrtcProvider를 생성합니다.
    let roomId = "test" + pageNo;
    provider.current = new WebrtcProvider(roomId, doc, {
      signaling: [`ws://${serverHost}:8080/ws/crdt`],
    });

    // 클로저를 사용하여 필요한 값을 캡처한 함수 생성
    const handleBeforeUnload = (event) => {
      submitPage(editor.document, pageRef.current);
    };

    /** 페이지 닫힐 때(새로고침, 다른 url 이동) 저장 */
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 컴포넌트가 언마운트될 때 provider를 정리합니다.
    return () => {
      setTitleStat(pageNo);
      /** unmount 될 때 저장 */
      submitPage(editor.document, pageRef.current);

      window.removeEventListener("beforeunload", handleBeforeUnload);
      provider.current.destroy();
    };
  }, [pageNo]);

  /** 페이지 이동할 때마다 협력자, 동료, 페이지 조회 */
  useEffect(() => {
    fetchUsersByCompany(authSlice.company);
    fetchPageData();
    selectPartners();
  }, [currentPageNo, pageNo]);

  /** 이미 초대된 사용자 -> 선택된 사용자로 넣어주기 */
  useEffect(() => {
    setSelectedUsers(invitedUsers);
    setIsCurrentUserInvited(
      invitedUsers.some((user) => user.uid === authSlice.uid)
    );
  }, [invitedUsers, authSlice.uid]);

  /** 페이지 정보 불러오기 */
  const fetchPageData = async () => {
    try {
      const pageData = await getPageData(currentPageNo);
      setTitle(pageData.title);
      setUid(pageData.uid);

      if (editor.document.length === 1) {
        for (let i = 0; i < 1; i++) {
          const docView = JSON.parse(pageData.content);
          //editor.insertBlocks(docView, docView[i].id, "after");
          editor.replaceBlocks(editor.document, docView);
        }
      }
    } catch (error) {
      console.error("Error fetching page data: ", error);
    }
  };


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

    pageRef.current.title = e.target.innerText;
    /** 입력 커서 위치 설정 */
    setTimeout(() => {
      range.setStart(range.startContainer, startOffset);
      range.setEnd(range.startContainer, startOffset);
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  };

  /** 페이지 삭제 */
  const deleteHandler = async () => {
    try {
      const response = await deletePage(pageNo);
      navigate(-1);
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  /** 협력자 조회 */
  const selectPartners = async () => {
    try {
      const partners = await getPartners(pageNo);
      setInvitedUsers(partners);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  /** 협력자 선택 */
  const handleInviteUser = (event, value) => {
    setSelectedUsers(value);
    console.log(selectedUsers);
  };

  /** 같은 회사인 유저 조회 */
  const fetchUsersByCompany = async (company) => {
    try {
      const users = await getUsersByCompany(company);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching company users:", error);
    }
  };

  /** 현재 사용자 제외 */
  const getFilteredUsers = () => {
    return users.filter(
      (user) =>
        user.uid !== authSlice.uid &&
        !invitedUsers.map((inuser) => inuser.uid).includes(user.uid)
    );
  };

  /** 협력자 초대 및 삭제 요청 */
  const invitePartners = async () => {

    const invitedUserIds = invitedUsers.map((user) => user.uid);
    const selectedUserIds = selectedUsers.map((user) => user.uid);

    const usersToAdd = selectedUserIds.filter(
      (uid) => !invitedUserIds.includes(uid)
    );
    const usersToRemove = invitedUserIds.filter(
      (uid) => !selectedUserIds.includes(uid)
    );

    // 추가 요청
    if (usersToAdd.length > 0) {
      const partnerData = {
        pageNo: pageNo,
        users: usersToAdd,
      };

      try {
        const response = await addPartners(partnerData);
        console.log("Added Partners Response:", response);
      } catch (error) {
        console.error("Error inviting partners:", error);
      }
    }

    // 삭제 요청
    if (usersToRemove.length > 0) {
      try {
        for (const uid of usersToRemove) {
          const partnerDTO = {
            pageNo: pageNo,
            uid: uid,
          };
          const response = await removePartner(partnerDTO);
          console.log("Removed Partner Response:", response);
        }
      } catch (error) {
        console.error("Error removing partners:", error);
      }
    }

    setModalOpen(false);
  };

  /** 모달 닫힘 */
  const closeModalAndInvite = async () => {
    await invitePartners();
    setModalOpen(false);
  };

  return (
    <div className="Editor">
      <h1
        className="pageTitle"
        spellCheck="true"
        placeholder="제목 없음"
        contentEditable={authSlice.uid === uid}
        onInput={handleInputTitle}
        ref={titleRef}
      >
        {title}
      </h1>
      <BlockNoteView
        editor={editor}
        theme="light"
      />
      {!isCurrentUserInvited && (
        <>
          <button
            className="btnInvite"
            onClick={() => setModalOpen(true)}
            style={{ marginTop: "10px" }}
          >
            협력자초대
          </button>
          <button
            className="btnDelete"
            onClick={deleteHandler}
            style={{ marginTop: "10px" }}
          >
            페이지삭제
          </button>
        </>
      )}
      <Modal open={modalOpen} onClose={closeModalAndInvite}>
        <div className="modalContent">
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={getFilteredUsers()}
            getOptionLabel={(option) => option.name}
            value={selectedUsers}
            defaultValue={invitedUsers}
            onChange={handleInviteUser}
            renderInput={(params) => (
              <TextField
                {...params}
                label="협력자 초대"
                placeholder="사용자 선택"
              />
            )}
            sx={{ width: "500px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Editor;
