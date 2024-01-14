import React from "react";
import { ThemeProvider } from "@mui/material";
import { InputStyles } from "../Definition/inputStyles";
import { TextInputs } from "src/components/TextComponents/TextInputs";

const Text: React.FC = () => {
  const theme = InputStyles();
  return (
    <ThemeProvider theme={theme}>
        <TextInputs/>
    </ThemeProvider>
  );
};

export default Text;
