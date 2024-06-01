import React from 'react';
import Updatess from './Updatess';
import { useSelector } from 'react-redux';
const Main = () => {
    const authSlice = useSelector((state) => state.authSlice);
    console.log("main:", authSlice);
    return (
        <>
            <Updatess />
        </>
    );
};

export default Main;
