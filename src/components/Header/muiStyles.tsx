import { createTheme } from "@mui/material";

const muiStyles = () => {
  const theme = createTheme({
    typography: {
      fontFamily: `"Montserrat", sans-serif`,
    },
    palette: {
      primary: {
        main: "#b3b3b3",
        dark: "#b3b3b3",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 400,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  return theme;
};

export default muiStyles;
