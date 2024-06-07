import { Button } from "@mui/material";
import React from "react";
import { LuMailQuestion } from "react-icons/lu";

const WriteFooter = () => {
  const button = {
    marginTop: "15px",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
  };

  return (
    <div>
      <section>
        <Button size="large" variant="outlined" href="../" style={button}>
          취소
        </Button>
        <Button size="large" variant="outlined" href="#" style={button}>
          문의하기 <LuMailQuestion />
        </Button>
      </section>
    </div>
  );
};

export default WriteFooter;
