import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "axios";
import { globalPath } from "globalPaths";
import Moment from "moment";

const url = globalPath.path;

export default function RecipeReviewCard() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    // 답변하지 않은 글 목록
    axios
      .get(`${url}/question/select`)
      .then((response) => {
        console.log(response.data);
        setQuestion(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlerClickBtn = () => {};

  return (
    <>
      <h3 style={{ marginLeft: "50px" }}>답변해주세요!</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {question
          .filter((question) => question.status === 0)
          .map((question, index) => (
            <Card
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "18%",
                height: "200px",
                justifyContent: "space-between",
                marginRight: "100px",
                margin: "10px",
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
                  style={{ float: "right", color: "#808080", mb: 1.5 }}
                >
                  {""}
                  작성자:{question.uid}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handlerClickBtn(question.id)}
                  style={{ justifyItems: "right", color: "#000000" }}
                  size="small"
                >
                  답변하기
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
      <h3 style={{ marginTop: "30px", marginLeft: "50px" }}>답변 완료 글</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {question
          .filter((question) => question.status === 1)
          .map((question, index) => (
            <Card
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                height: "200px",
                justifyContent: "space-between",
                marginRight: "100px",
                margin: "50px",
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
                  style={{ float: "right", color: "#808080", mb: 1.5 }}
                >
                  {""}
                  작성자:{question.uid}
                </Typography>
              </CardContent>
              <CardActions>답변완료!</CardActions>
            </Card>
          ))}
      </div>
    </>
  );
}
