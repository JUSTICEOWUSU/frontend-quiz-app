import RouteConfig from "./route";
import theme from "./styles/theme";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import ResultsContextProvider from "./context/contexts";
import { useState, createContext, useEffect } from "react";

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
  // A state for determining if the app component is ready to mount
  const [mountedComponent,setMountedComponent] = useState<boolean>(false)
  
  useEffect(() => {
    // getting previous app theme mode from local storage
    const mode = window.localStorage.getItem("mode");
    mode? setColorMode(mode) : "";
    setMountedComponent(true)
  }, []);
  
  // Updated theme with a mode property(key)
     const updatedTheme = {...theme, mode:colorMode}

  if (!mountedComponent) return <div/>
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
