import React from 'react'
import ChatLayout from '../../layouts/ChatLayout'
import NewPageMain from '../../components/newPage/NewPageMain'
import 'styles/newPage/newpage.css';

const NewPage = () => {
  return (
    <ChatLayout>
      <NewPageMain />
    </ChatLayout>
  )
}

export default NewPage