import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { globalPath } from "globalPaths";
import Moment from "moment";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";

const url = globalPath.path;
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

export default function RecipeReviewCard() {
  const [question, setQuestion] = useState([]);
  const [forRender, setForRender] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  /**답변하기 state관리 */
  const [answer, setAnswer] = useState("");
  const [qno, setQno] = useState("");

  /**답변 완료 state관리 */
  const [getAnswer, setGetAnswer] = useState([]);

  const authSlice = useSelector((state) => state.authSlice);

  const uid = authSlice.uid;

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  /**답변 state onChange함수 */
  const handlerAnswer = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  };

  /**답변하기 모달 창 */
  const hanlderClickCard = (e) => {
    // 모달 창 띄우기
    setOpen(true);

    // 답변 pk값 주기
    setQno(e);
  };

  /**답변완료 모달창*/
  const hanlderClickCard2 = (e) => {
    // 모달 창 띄우기
    setOpen2(true);

    /** 완료된 답변 들고오기*/
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

  // 답변하기 버튼 (답변하기)
  const clickAnswer = () => {
    const jsonData = {
      uid: uid,
      parent: qno,
      content: answer,
    };

    axios
      .post(`${url}/question/answer`, jsonData)
      .then((response) => {
        console.log(response.data);
        setOpen(false);
        setAnswer("");
        setForRender(!forRender);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**문의 글 목록 가져오기(다 가져와서 status로 나눠서 출력) */
  useEffect(() => {
    axios
      .get(`${url}/question/select`)
      .then((response) => {
        console.log(response.data);
        setQuestion(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [forRender]);

  return (
    <>
      <h3 style={{ marginLeft: "10px" }}>답변해주세요!</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {question
          .filter((question) => question.status === 0)
          .map((question, index) => (
            <Card
              onClick={() => hanlderClickCard(question.qno)}
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "18%",
                height: "200px",
                justifyContent: "space-between",
                marginRight: "100px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {question.title}
                </Typography>
                <Typography
                  style={{ float: "left", color: "#808080", mb: 1.5 }}
                  color="text.secondary"
                >
                  {Moment(question.rdate)
                    .subtract(1, "month")
                    .format("YYYY-MM-DD")}
                </Typography>
                <Typography
                  style={{
                    border: "1px solid #FFFFFF",
                    borderRadius: "10px",
                    padding: "5px",
                    float: "left",
                    fontWeight: "bold",
                    backgroundColor: "#8181F7",
                    color: "#FFFFFF",
                    mb: 1.5,
                  }}
                >
                  답변중
                </Typography>

                <Typography
                  style={{ float: "right", color: "#808080", mb: 1.5 }}
                >
                  {""}
                  작성자:{question.uid}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
      <h3 style={{ marginTop: "30px", marginLeft: "10px" }}>답변 완료 글</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {question
          .filter((question) => question.status === 1)
          .map((question, index) => (
            <Card
              onClick={() => hanlderClickCard2(question.qno)}
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "18%",
                height: "200px",
                justifyContent: "space-between",
                marginRight: "100px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {question.title}
                </Typography>
                <Typography
                  style={{ float: "left", color: "#808080", mb: 1.5 }}
                  color="text.secondary"
                >
                  {Moment(question.rdate)
                    .subtract(1, "month")
                    .format("YYYY-MM-DD")}
                </Typography>
                <Typography
                  style={{
                    border: "1px solid #FFFFFF",
                    borderRadius: "10px",
                    padding: "5px",
                    float: "left",
                    fontWeight: "bold",
                    backgroundColor: "#3ADF00",
                    color: "#FFFFFF",
                    mb: 1.5,
                  }}
                >
                  답변완료!
                </Typography>
                <Typography
                  style={{ float: "right", color: "#808080", mb: 1.5 }}
                >
                  {""}
                  작성자:{question.uid}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            답변하기
          </Typography>
          <TextField
            style={{ marginTop: "20px", width: "400px" }}
            id="standard-basic"
            multiline
            rows={5}
            label="답변"
            variant="outlined"
            value={answer}
            onChange={handlerAnswer}
          />
          <Typography
            onClick={clickAnswer}
            style={{
              marginTop: "15px",
              border: "1px solid #FFFFFF",
              borderRadius: "10px",
              padding: "5px",
              float: "right",
              fontWeight: "bold",
              backgroundColor: "#DF7401",
              color: "#FFFFFF",
              cursor: "pointer",
              mb: 1.5,
            }}
          >
            답변하기
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginBottom: "5px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            답변
          </Typography>
          <Typography style={{ marginBottom: "5px" }}>
            {" "}
            내용 : {getAnswer.content}
          </Typography>
          <Typography style={{ float: "right" }}>
            {Moment(getAnswer.rdate).subtract(1, "month").format("YYYY-MM-DD")}{" "}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
