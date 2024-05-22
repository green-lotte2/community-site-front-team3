import React from 'react';
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { globalColors } from '../../globalColors';

// 스타일이 적용된 CustomButton 컴포넌트
export const CustomButton = styled(Button)(() => ({
  fontSize: "14px",
  fontWeight: "550",
  //marginTop: "10px",
  marginLeft: "3px",
  marginBottom: "3px",
  color: globalColors.white,
  backgroundColor: globalColors.orange,
  "&:hover": { backgroundColor: globalColors.orange },
}));
