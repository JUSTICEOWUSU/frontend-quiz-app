import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Layout from "./components/layout/Layout";
import Hero from "./pages/hero/Hero";
import Subject from "./pages/subject/Subject";

function RouteConfig() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Subject/>}></Route>
              </Route>
            </Routes>
          </Router>
      </ThemeProvider>
    );
}

export default RouteConfig
