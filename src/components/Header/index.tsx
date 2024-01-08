import React from "react"
import styles from "src/components/Header/Header.module.scss"
import { ButtonGroup, Button, ThemeProvider } from "@mui/material"
import { Link, useLocation } from "react-router-dom" 
import muiStyles from "./muiStyles"

const Header: React.FC = () => {
  const location = useLocation()
  const currentPageLocation = location.pathname
  const theme = muiStyles()
  const tabs = [
    {
      title: "Определение",
      link: "/",
    },
    {
      title: "Текст",
      link: "/text",
    },
    { title: "Словарь", link: "/dictionary" },
  ]
  const [, setCurrentPage] = React.useState({})
  return (
    <ThemeProvider theme={theme}>
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
            <Link to={tab.link} key={i}>
              <Button
                onClick={() => setCurrentPage(tab.title)}
                sx={{
                  width: { xs: "130px", ssm: "90px", sm: "110px", md: "140px" },
                  height: { xs: "40px", ssm: "60px", sm: "50px" },
                  fontSize: { xs: 10, md: 12, ssm: 9 },
                  backgroundColor: currentPageLocation === tab.link ? "#e5e5e5" : '',
                }}
              >
                {tab.title}
              </Button>
            </Link>
          ))}
        </ButtonGroup>
      </header>
    </ThemeProvider>
  )
}

export default Header
