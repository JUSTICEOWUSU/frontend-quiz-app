import RouteConfig from "./route";
import { ThemeProvider } from "styled-components";
import theme  from "./styles/theme";
import { useState,createContext } from "react";
import GlobalStyle from "./styles/global";

interface MyContextType {
  colorMode: string;
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue: MyContextType = {
  colorMode: "light",
  setColorMode: () => {},
};

export const ModeContext = createContext(defaultValue);

function App() {
      const [colorMode, setColorMode] = useState<string>("light");

     const updatedTheme = {...theme, mode:colorMode}


  return (
    <ThemeProvider theme={updatedTheme}>
      <GlobalStyle />
      <ModeContext.Provider value={{ colorMode, setColorMode }}>
        <RouteConfig />
      </ModeContext.Provider>
    </ThemeProvider>
  );
}

export default App
