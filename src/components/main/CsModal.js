import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { globalPath } from "globalPaths";

const url = globalPath.path;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CsModal({ open, handleClose }) {
  const authSlice = useSelector((state) => state.authSlice);
  const uid = authSlice.uid;
  const [articles, setArticles] = useState([]);


  /** 내 문의 글 목록 불러오기 */
  useEffect(() => {

    const fetchData = async () => {
        await axios.get(`${url}/cs?uid=${uid}`)
        .then((response) => {
          setArticles(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
}, [uid]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          내 문의 목록
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          여기에서 내 문의 내용을 확인하세요.
        </Typography>
      </Box>
    </Modal>
  );
}
