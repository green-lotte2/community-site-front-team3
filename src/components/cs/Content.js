import React, { useState, SyntheticEvent, useEffect } from "react";
import ContentHead from "components/cs/ContentHead";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { LuMailQuestion } from "react-icons/lu";
import { globalPath } from "globalPaths";
import axios from "axios";

const Content = () => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [csContent, setCsContent] = useState("");
  const [csTitle, setCsTitle] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /**서버에서 내용 가져오는 로직 */
  useEffect(() => {
    const url = globalPath.path;
    axios
      .get(`${url}/selectCs?cateName=` + value)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  const style = {
    display: "flex",
    width: "33%",
    flexShrink: 0,
    color: "text.secondary",
  };
  const button = {
    marginTop: "15px",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
  };
  return (
    <div>
      <ContentHead value={value} setValue={setValue} />

      {csContent.length > 0
        ? csContent.map((content, index) => (
            <div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={style}>회원/결제</Typography>
                  <Typography>결제를 카카오 페이로 하고싶어요</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>잘 하면 되지 않을까요?</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))
        : null}

      <Button
        size="large"
        variant="outlined"
        href="#outlined-buttons"
        style={button}
      >
        문의하기 <LuMailQuestion />
      </Button>
    </div>
  );
};

export default Content;
