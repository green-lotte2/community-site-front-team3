import React, { useState } from 'react';
import EditableBlock from './EditableBlock';
import Editor from './Editor';

const NewPageMain = () => {
  // EditableBlock에 보낼 props
  const [block, setBlock] = useState({ contents: "" });

  /** 내용 입력할 때마다 EditableBlock에 보낼 props 수정 */
  const handleBlockChange = (newContents) => {
    setBlock({ contents: newContents });
  };

  // 글 내용 조회 

  // 만약 글 내용이 있으면 출력, 없으면 새 editor 추가
  return (
    <div className="NewPageMain">
      <Editor />
    </div>
  );
};

export default NewPageMain;
