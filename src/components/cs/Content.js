import React, { useState, useEffect } from "react";
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
  const [expanded, setExpanded] = useState();
  const [value, setValue] = useState("결제/환불");
  const [articles, setArticles] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /**서버에서 내용 가져오는 로직 */
  useEffect(() => {
    const url = globalPath.path;
    axios
      .get(`${url}/selectCs?cateName=` + value)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  const style = {
    display: "flex",
    width: "35%",
    flexShrink: 0,
    marginLeft: "20px",
    color: "text.secondary",
  };

  const contentStyle = {
    marginLeft: "20px",
  };
  return (
    <div>
      <ContentHead value={value} setValue={setValue} />

      <div>
        {articles.map((article, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography sx={style}>{value}</Typography>
              <Typography key={index}>{article.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={contentStyle} key={index}>
                {article.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Content;
