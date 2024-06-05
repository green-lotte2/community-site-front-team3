import React from 'react'
import NewPageMain from '../../components/newPage/NewPageMain'
import DefaultLayout from 'layouts/DefaultLayout';
import { useParams } from 'react-router-dom';

const NewPage = () => {
  const { pageNo } = useParams();

  return (
    <DefaultLayout>
      <NewPageMain pageNo={pageNo} />
    </DefaultLayout>
  )
}

export default NewPage
