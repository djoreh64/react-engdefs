import Definition from "src/pages/Definition"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Text from "./pages/Text"
import Dictionary from "./pages/Dictionary"

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Definition />} />
          <Route path="/text" element={<Text />} />
          <Route path="/dictionary" element={<Dictionary />} />
        </Routes>
      </main>
    </>
  )
}

export default App
