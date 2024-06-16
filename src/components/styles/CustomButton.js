
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

export const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginButton = styled(Button)(() => ({
  fontSize: "14px",
  fontWeight: "600",
  marginLeft: "3px",
  marginRight: "3px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "300px",
  height: "40px",
  marginBottom: "3px",
  color: globalColors.white,
  backgroundColor: globalColors.lightOrange,
  "&:hover": { backgroundColor: globalColors.lightOrange },
}));

