import React, { useState } from 'react'
import NewPageMain from '../../components/newPage/NewPageMain'
import DefaultLayout from 'layouts/DefaultLayout';
import { useParams } from 'react-router-dom';

const NewPage = () => {
  const { pageNo } = useParams();
  const [titleStat, setTitleStat] = useState("");
  return (
    <DefaultLayout
    titleStat={titleStat}
    >
      <NewPageMain 
      pageNo={pageNo}
      setTitleStat={setTitleStat}
      />
    </DefaultLayout>
  )
}

export default NewPage
