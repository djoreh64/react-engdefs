import Definition from "src/pages/Definition";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Text from "./pages/Text";
import Dictionary from "./pages/Dictionary";

const App = () => {
  const routes = [
    { path: "/", Component: Definition },
    { path: "/text", Component: Text },
    { path: "/dictionary", Component: Dictionary },
  ];
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default App;
