import RouteConfig from "./route";
import { ThemeProvider } from "styled-components";
import theme  from "./styles/theme";
import { useState,createContext } from "react";
import GlobalStyle from "./styles/global";
import ResultsContextProvider from "./context/contexts";


interface MyContextType {
  colorMode: string;
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
}

// default value for the Context state manager
const defaultValue: MyContextType = {
  colorMode: "light",
  setColorMode: () => {},
};

// Context for app theme mode(dark/light)
export const ModeContext = createContext(defaultValue);

function App() {
  const [colorMode, setColorMode] = useState<string>("light");
  
  // Updated theme with a mode property(key)
     const updatedTheme = {...theme, mode:colorMode}

  return (
    <ThemeProvider theme={updatedTheme}>
      <GlobalStyle />
      <ModeContext.Provider value={{ colorMode, setColorMode }}>
        <ResultsContextProvider>
          <RouteConfig />
        </ResultsContextProvider>
      </ModeContext.Provider>
    </ThemeProvider>
  );
}

export default App
