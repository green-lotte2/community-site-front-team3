import React, { useState } from 'react';
import EditableBlock from './EditableBlock';

const NewPageMain = () => {
  // EditableBlock에 보낼 props
  const [block, setBlock] = useState({ contents: "" });

  /** 내용 입력할 때마다 EditableBlock에 보낼 props 수정 */
  const handleBlockChange = (newContents) => {
    setBlock({ contents: newContents });
  };

  return (
    <div className="NewPageMain">
      <h1 class="pageTitle" spellcheck="true" placeholder="제목 없음" contentEditable="true"></h1>
      <EditableBlock block={block} onChange={handleBlockChange} />

      
    </div>
  );
};

export default NewPageMain;
