
// CONTEXT FOR MANAGING NUMBER CORRECT CHOICES AND THE TOTAL NUMBER QUESTION
import { createContext, useState } from "react";


interface OptionValueType{
  answer: string;
  icon: string;
}

interface OptionTypes {
  a: OptionValueType;
  b: OptionValueType;
  c: OptionValueType;
  d: OptionValueType;
}

interface QuestionStateTypes {
  answer: string;
  chosenAnswer: string;
  currentQuestionTracker: number;
  disabled: boolean;
}

interface contextDataTypes {
  resultPageStates: {
    numberOfQuetsions: number;
    numberOfPasssedQuestions: number;
  };

  subjectPageStates: {
    answerOptions: OptionTypes;
    questionState: QuestionStateTypes;
    selectAnswerErrorMessage: string;
    submitButtonMessage: string;
    moveToNextQuestion: boolean;
  }
}

interface MyContextType {
  contextData: contextDataTypes;
  setContextData: React.Dispatch<React.SetStateAction<contextDataTypes>>;
}

// default value for the Context state manager
const defaultValue: MyContextType = {
  contextData: {
    resultPageStates: { numberOfPasssedQuestions: 0, numberOfQuetsions: 0 },

    subjectPageStates: {
      answerOptions: {
        a: { answer: "", icon: "" },
        b: { answer: "", icon: "" },
        c: { answer: "", icon: "" },
        d: { answer: "", icon: "" },
      },

      questionState: {
        currentQuestionTracker:0,
        answer:"",
        chosenAnswer: "",
        disabled: false,
      },

      selectAnswerErrorMessage: "hideSelectAnswer",
     submitButtonMessage: "submit answer",
     moveToNextQuestion: false

    },
  },

  setContextData: () => {},
};

// Context for app theme mode(dark/light)
export const appContext = createContext(defaultValue);

export default function ResultsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contextData, setContextData] = useState<contextDataTypes>(defaultValue.contextData);

  return (
    <appContext.Provider value={{ contextData, setContextData }}>
      {children}
    </appContext.Provider>
  );
}
