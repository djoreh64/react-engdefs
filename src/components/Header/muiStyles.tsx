import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    ssm: true;
  }
}

const muiStyles = () => {
  return createTheme({
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
        ssm: 200,
        sm: 400,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });
};

export default muiStyles;
