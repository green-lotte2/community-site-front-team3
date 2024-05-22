import React from 'react';
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { globalColors } from '../../globalColors';

// 스타일이 적용된 CustomButton 컴포넌트
export const CustomButton = styled(Button)(() => ({
  fontSize: "2rem",
  marginTop: "10px",
  backgroundColor: globalColors.orange[100],
  "&:hover": { backgroundColor: globalColors.orange[200] },
}));
