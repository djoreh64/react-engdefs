import React from 'react'
import styles from 'src/components/Header/Header.module.scss'
import { ButtonGroup, Button, ThemeProvider, createTheme} from '@mui/material'


const Header: React.FC = () => {
  const tabs = ['Определение', 'Текст', 'Словарь']
  const [currentPage, setCurrentPage] = React.useState(tabs[0])
  const theme = createTheme({
    typography: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#b3b3b3",
        dark: "#b3b3b3",
      },
    }})
  return (
    <ThemeProvider theme={theme}>
      <header className={styles.header}>
        <ButtonGroup sx={{backgorundColor: '#fff'}} size="large">
          {tabs.map(tab => (<Button onClick={() => setCurrentPage(tab)} sx = {currentPage === tab && {backgroundColor: '#e9e9e9'}}>{tab}</Button>))}
        </ButtonGroup>
      </header>
    </ThemeProvider>
  )
}

export default Header
