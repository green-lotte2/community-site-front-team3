import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import NewPageMain from '../../components/newPage/NewPageMain'
import 'styles/newPage/newpage.css';

const NewPage = () => {
  return (
    <DefaultLayout>
      <NewPageMain />
  </DefaultLayout>
  )
}

export default NewPage