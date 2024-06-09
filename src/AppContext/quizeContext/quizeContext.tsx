// CONTEXT FOR MANAGING NUMBER CORRECT CHOICES AND THE TOTAL NUMBER QUESTION
import { createContext, useState } from "react";

interface OptionValueType {
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

interface quizeContextDataTypes {
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
  };

  toggleFocuse: string;
}

interface MyContextType {
  quizeContextData: quizeContextDataTypes;
  setQuizeContextData: React.Dispatch<React.SetStateAction<quizeContextDataTypes>>;
}

// default value for the Context state manager
const defaultValue: MyContextType = {
  quizeContextData: {
    resultPageStates: { numberOfPasssedQuestions: 0, numberOfQuetsions: 0 },

    subjectPageStates: {
      answerOptions: {
        a: { answer: "", icon: "" },
        b: { answer: "", icon: "" },
        c: { answer: "", icon: "" },
        d: { answer: "", icon: "" },
      },

      questionState: {
        currentQuestionTracker: 0,
        answer: "",
        chosenAnswer: "",
        disabled: false,
      },

      selectAnswerErrorMessage: "hideSelectAnswer",
      submitButtonMessage: "submit answer",
      moveToNextQuestion: false,
    },
    toggleFocuse: "",
  },

  setQuizeContextData: () => {},
};

// Context for the quize states
export const quizeContext = createContext(defaultValue);

export default function QuizeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quizeContextData, setQuizeContextData] = useState<quizeContextDataTypes>(
    defaultValue.quizeContextData
  );

  return (
    <quizeContext.Provider value={{ quizeContextData, setQuizeContextData }}>
      {children}
    </quizeContext.Provider>
  );
}
