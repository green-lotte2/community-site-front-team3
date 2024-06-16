import ContentEditable from "react-contenteditable";
import { useState, useRef } from "react";

/** 사용자가 입력할 때 마다 값 가져옴 */
const EditableBlock = ({ block, onChange }) => {
  const [html, setHtml] = useState(block.contents);
  const ref = useRef();

  console.log(html);
  const handleChange = (e) => {
    setHtml(e.target.value);
    onChange(e.target.value);
  };

  return (
    <ContentEditable
      className="contentEditor"
      innerRef={ref}
      html={html}
      disabled={false}
      onChange={handleChange}
    placeholder="내용을 작성해주세요."
    />
  );
};

export default EditableBlock;
