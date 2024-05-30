import { createContext,useState } from "react";

interface resultDataTypes{
  numberOfQuetsions: number;
  numberOfPasssedQuestions: number;
}

interface MyContextType {
  resultData: resultDataTypes;
  setResultData: React.Dispatch<React.SetStateAction<resultDataTypes>>;
}

// default value for the Context state manager
const defaultValue: MyContextType = {
  resultData: {numberOfPasssedQuestions:0, numberOfQuetsions:0},
  setResultData: () => {},
};

// Context for app theme mode(dark/light)
export const resultContext = createContext(defaultValue);

export default function ResultsContextProvider({ children }: { children: React.ReactNode }) {
  
  const [resultData, setResultData] = useState<resultDataTypes>({
    numberOfPasssedQuestions: 0,
    numberOfQuetsions: 0,
  });

  return (
    <resultContext.Provider value={{ resultData, setResultData }}>
      {children}
     </resultContext.Provider>
    )
}
