import React, { useState } from 'react';
import Editor from './Editor';

const NewPageMain = ({ pageNo }) => {

  // 글 내용 조회 

  // 만약 글 내용이 있으면 출력, 없으면 새 editor 추가
  return (
    <div className="NewPageMain">
      <Editor pageNo={pageNo} />
    </div>
  );
};

export default NewPageMain;
