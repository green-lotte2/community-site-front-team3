import React, { useState, SyntheticEvent, useEffect } from "react";
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
  const [csCate, setCsCate] = useState("");
  const [csContent, setCsContent] = useState("");

  const handleCate = (event) => {
    let cate = event.target.value;
    setCsCate((...prev) => ({ prev: cate }));
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    // 서버에서 내용 가져오는 로직
    console.log("아아");
  }, [csCate]);

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
      <ContentHead handleCate={handleCate} />

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
