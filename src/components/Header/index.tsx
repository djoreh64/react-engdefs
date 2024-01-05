import React from "react";
import styles from "src/components/Header/Header.module.scss";
import { ButtonGroup, Button, ThemeProvider } from "@mui/material";
import muiStyles from "./muiStyles";

const Header: React.FC = () => {
  const tabs = ["Определение", "Текст", "Словарь"];
  const [currentPage, setCurrentPage] = React.useState(tabs[0]);
  return (
    <ThemeProvider theme={muiStyles}>
      <header className={styles.header}>
        <ButtonGroup
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { md: "40%", xs: "80%" },
            backgorundColor: "#fff",
            height: { xs: "70px", md: "40px" },
          }}
          size="large"
        >
          {tabs.map((tab, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(tab)}
              sx={{
                overflow: "hidden",
                width: "100%",
                height: "100%",
                fontSize: { xs: 9, sm: 12 },
                backgroundColor: currentPage === tab && "#e5e5e5",
              }}
            >
              {tab}
            </Button>
          ))}
        </ButtonGroup>
      </header>
    </ThemeProvider>
  );
};

export default Header;
