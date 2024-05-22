import { createTheme } from "@mui/material/styles";
import { globalColors } from "./globalColors";

export const theme = createTheme({
  palette: {
    primary: {
      main: globalColors.orange[100],
      light: globalColors.orange[200],
      dark : globalColors.orange[500],
      contrastText : globalColors.white,
    },
    secondary: {
      main: globalColors.orange[100],
      light: globalColors.orange[200],
      dark : globalColors.orange[100],
      contrastText : globalColors.white,
    }
  },

})