import React from 'react'
import ChatLayout from '../../layouts/ChatLayout'
import NewPageMain from '../../components/newPage/NewPageMain'
import 'styles/newPage/newpage.css';
import DefaultLayout from 'layouts/DefaultLayout';

const NewPage = () => {
  return (
    <DefaultLayout>
      <NewPageMain />
    </DefaultLayout>
  )
}

export default NewPage
