import "src/style/style.scss";
import { ThemeProvider } from "@mui/material";
import { InputStyles } from "src/pages/Definition/inputStyles";
import DefinitionTextField from "src/components/DefinitionComponents/DefinitionTextField";  
import DefinitionDescription from "src/components/DefinitionComponents/DefinitionDescription";

const Definition: React.FC = () => {
  const theme = InputStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <DefinitionTextField />
        <DefinitionDescription />
      </div>
    </ThemeProvider>
  );
};

export default Definition;
