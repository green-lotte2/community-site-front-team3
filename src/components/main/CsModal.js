import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { Accordion, Card } from "@mui/material";
import "../../styles/cs/cs.scss";
import { globalPath } from "globalPaths";
import axios from "axios";

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

const url = globalPath.path;

export default function CsModal({ open, handleClose, myAnswer }) {
  const [expandedIndex, setExpandedIndex] = useState(""); // 답변보기 관리 state

  const [getAnswer, setGetAnswer] = useState(""); // 가져온 답변 관리 state

  /**답변 가져오기 */
  const selectAnswer = (e) => {
    axios
      .get(`${url}/question/selectAnswer?parent=${e}`)
      .then((response) => {
        console.log(response.data);
        setGetAnswer(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewBtnHandler = (e) => {
    setExpandedIndex(expandedIndex === "접기" ? "답변보기" : "접기");
    console.log(expandedIndex);
    console.log(e);
    /**답변 가져오기 로직 수행 */
    selectAnswer(e);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modaldal" sx={style}>
        <Typography
          style={{
            fontWeight: "bolder",
            padding: "6px 12px",
            border: "1px solid #FFFFFF",
            borderRadius: "10px",
            backgroundColor: "#8181F7",
            color: "#FFFFFF",
            textAlign: "center",
            marginLeft: "6px",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          답변 대기
        </Typography>
        {myAnswer
          .filter((answer) => answer.status === 0)
          .map((answer, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <span style={{}}>
                {index + 1}. {answer.title}
              </span>
              <Card>
                <Typography
                  key={index}
                  id="modal-modal-description"
                  style={{ mt: 2 }}
                  dangerouslySetInnerHTML={{
                    __html: answer.content.replace("@FilePath###", url),
                  }}
                ></Typography>
              </Card>
            </div>
          ))}
        <Typography
          style={{
            fontWeight: "bolder",
            padding: "6px 12px",
            border: "1px solid #FFFFFF",
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "#3ADF00",
            color: "#FFFFFF",
            textAlign: "center",
            marginLeft: "6px",
            marginTop: "30px",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          답변 완료
        </Typography>
        {myAnswer && myAnswer.length > 0 ? (
          myAnswer
            .filter((answer) => answer.status === 1)
            .map((answer, index) => (
              <div key={index} style={{ margin: "10px" }}>
                <span style={{ margin: "3px" }}>
                  {index + 1}. {answer.title}
                </span>
                <Card>
                  <Typography
                    key={index}
                    id="modal-modal-description"
                    style={{ mt: 2 }}
                    dangerouslySetInnerHTML={{
                      __html: answer?.content ? answer.content : "문의 없음",
                    }}
                  ></Typography>
                </Card>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => viewBtnHandler(answer.qno)}
                >
                  {expandedIndex === "접기" ? "답변접기" : "답변보기"}
                </span>
                {expandedIndex === "접기" && (
                  <div
                    style={{
                      padding: "0 10px",
                    }}
                  >
                    &gt; {getAnswer.content}
                  </div>
                )}
              </div>
            ))
        ) : (
          <div>문의 내역이 없습니다.</div>
        )}
      </Box>
    </Modal>
  );
}
