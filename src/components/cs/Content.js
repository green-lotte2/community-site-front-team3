import React, { useState, SyntheticEvent } from "react";
import ContentHead from "components/cs/ContentHead";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { LuMailQuestion } from "react-icons/lu";

const Content = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      <ContentHead />
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
      <Button
        size="large"
        variant="outlined"
        href="#outlined-buttons"
        style={button}
      >
        문의하기
        <LuMailQuestion />
      </Button>
    </div>
  );
};

export default Content;
