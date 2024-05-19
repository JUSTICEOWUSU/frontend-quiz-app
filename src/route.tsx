import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

function RouteConfig() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>
          QUIZ APP
          <Router>
            <Routes>
              <Route path="/"></Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    );
}

export default RouteConfig
