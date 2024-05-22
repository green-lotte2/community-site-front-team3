import { createTheme } from "@mui/material/styles";
import { globalColors } from "./globalColors";

export const theme = createTheme({
  palette: {
    primary: {
      main: globalColors.orange,
      light: globalColors.orange,
      dark : globalColors.orange,
      contrastText : globalColors.white,
    },
    secondary: {
      main: globalColors.orange,
      light: globalColors.orange,
      dark : globalColors.orange,
      contrastText : globalColors.white,
    }
  },

})