import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import { Card } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CsModal({ open, handleClose, myAnswer }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          답변 안된 문의
        </Typography>
        {myAnswer
          .filter((answer) => answer.status === 0)
          .map((answer, index) => (
            <Card style={{ margin: "10px" }}>
              <Typography
                key={index}
                id="modal-modal-description"
                style={{ mt: 2 }}
                dangerouslySetInnerHTML={{ __html: answer.content }}
              ></Typography>
            </Card>
          ))}
      </Box>
    </Modal>
  );
}
