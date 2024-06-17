import React from 'react';
import Header from '../components/common/main/Header';
import Aside from '../components/common/main/Aside';
import Footer from '../components/common/main/Footer';

const DefaultLayout = ({ children, titleStat, setPageState }) => {
  return (
    <div id="mainContainer">
      <Header />
      <main>{children}</main>
      <Aside titleStat={titleStat} setPageState={setPageState} />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
