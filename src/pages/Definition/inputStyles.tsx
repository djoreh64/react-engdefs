import { createTheme } from "@mui/material";

export const InputStyles = () => {
  const inputTheme = createTheme({
    typography: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: 14,
    },
    palette: {
      primary: {
        main: "#999999",
      },
      secondary: {
        main: "#ff0000",
      },
    },
  });
  return inputTheme;
};
