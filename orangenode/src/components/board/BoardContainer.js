import React from 'react'
import BoardTabs from './BoardTabs'
import EditorContainer from './EditorContainer'

const BoardContainer = ({ props }) => {
  return (
      
    <div className="boardContainer">
      <h2>게시판 글{props}</h2>
      <BoardTabs />
      <EditorContainer text={props} />
    </div>
  )
}

export default BoardContainer