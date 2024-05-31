import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
// import resultContext(context for managing scored questions and total number of attempted questions )
import { resultContext } from "../../context/contexts";

import { useParams, useNavigate } from "react-router-dom";
// importing custom utils function that manages the app data
import correctAnswer, { currentSubjectData } from "../pageUtils";

import SubmitButton from "../../components/submitButton/SubmitButton";
import OptionsButton from "../../components/optionsButton/OptionsButton";
import { ButtonsWrapper, ContentWrapper } from "../../components/layout/SharedLayouts"; 

// Page tages with styles
const QuestionWrapper = styled.div`
  padding: 0;

  .questionNumber {
    margin-top: 0;
    font-size: 0.875rem;
    color: ${({ theme }) =>
      theme.mode == "dark"
        ? theme.darkMode.miniText
        : theme.lightMode.miniText};
    font-family: "Rubik Variable Italic", "Rubik Italic", sans-serif;
  }

  .question {
    display: block;
    font-weight: 500;
    font-size: 1.25rem;
    margin: 0.75rem 0 1.5rem;
    font-family: ${({ theme }) => theme.fontFamily};
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    .questionNumber {
      font-weight: 400;
      font-size: 1.25rem;
    }

    .question {
      font-size: 2.25rem;
      margin: 1.6875rem 0 2.5rem;
    }
  }

  /* Tablets (1050px->) */
  @media (min-width: 1050px) {
    flex-basis: 0;
    flex-grow: 1;

    .question {
      min-height: 15rem;
      margin-bottom:0;
    }
  }
`;

const ProgressBar = styled.span`
  width: 100%;
  display: block;
  height: 0.6rem;
  padding: 0.25rem;
  border-radius: 62rem;
  background-color: ${({ theme }) =>
    theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button};

  span {
    height: 100%;
    display: block;
    border-radius: 6.5rem;
    transition: all 600ms ease-in-out;
    background-color: ${({ theme }) => theme.primaryBlue};
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    height: 1rem;
  }

  @media (min-width: 1050px) {
    margin-top: 0rem;
  }
`;

const SelectQuestion = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  margin: 0;
  transition: all 2s ease-in-out;

  p {
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: 1.125rem;
    font-family: ${({ theme }) => theme.fontFamily};
  }

  span {
    position: relative;
    display: block;
    width: 2rem;
    height: 2rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    p {
      font-size: 1.5rem;
    }

    span {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  @media (min-width: 1050px) {
    margin-top: -1rem;
  }
`;

// SUBJECT TYPES ->>
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

interface QuestionStateTypes{
  answer: string;
  chosenAnswer: string;
  disabled: boolean;
}

// <--SUBJECT TYPES


function Subject() {
  const navigate = useNavigate()
  // --> CUSTOM STATES/VARAIBLES FOR THE SUBJECT PAGE AND QUESTINING LOGIC <--//
  const { resultData, setResultData } = useContext(resultContext)
  
  // Obtaining the subject/topic from the url parameter
  const { subject } = useParams();

 
  const data = currentSubjectData(subject)[0]?.questions || [{question: "",
  options: [""],
  answer: ""}];

  // A state that controls eitrher to move to next question or not
  const [goToNext, setGoToNext] = useState<boolean>(false);

  // A state tracker for the current question
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // A state that controls the text content of the submit button e.g "submit answer","next question" and "see result"
  const [submitButtonContent, setSubmitButtonContent] = useState("submit answer");


  const [selectAnswer, setSelectAnswer] = useState<string>("hideSelectAnswer")

  // Question answer states (chosen answer, correct answer,etc.)
  const [questinonState, setQuestinonState] = useState<QuestionStateTypes>({
      answer: correctAnswer(
      data[currentQuestion].options,
      data[currentQuestion].answer
    ),
    chosenAnswer: "",
    disabled: false,
  });

  // states for the option buttons
  const [optionsState, setOptionsState] = useState<OptionTypes>({
    a: { answer: "", icon: "" },
    b: { answer: "", icon: "" },
    c: { answer: "", icon: "" },
    d: { answer: "", icon: "" },
  });


  // Set  states values to default
  function setAllStateToDefault() {
    setOptionsState({
      a: { answer: "", icon: "" },
      b: { answer: "", icon: "" },
      c: { answer: "", icon: "" },
      d: { answer: "", icon: "" },
    });
    setGoToNext(false);
    setSubmitButtonContent("submit answer");
    return setQuestinonState((prev) => ({ ...prev, chosenAnswer: "", disabled: false }));
  }

  function hideAnswerQuestion() {
    if (!selectAnswer) return setSelectAnswer("hideSelectAnswer");
    return;
  }
    
  
  // Submit button onclick event listeenr
  function handleSubmit() {
    if (!questinonState.chosenAnswer) {
      return setSelectAnswer("")
    }
    // checking if an answer has been selected
    if (!goToNext && questinonState.chosenAnswer) {
      setQuestinonState((prev) => ({ ...prev, disabled: true }));
      setGoToNext(true);
      setSubmitButtonContent(
        `${
          data.length == currentQuestion + 1 ? "see results" : "next question"
        }`
      );

      // Checking if the selected answer is correct and goToNext(question) is false;
      if (questinonState.chosenAnswer == questinonState.answer) {
        // updating the number of passed questions
        setResultData((prev) => ({...prev, numberOfPasssedQuestions:resultData.numberOfPasssedQuestions + 1}))
        
        // updating the uptions buttons states (border color and icons)
        return setOptionsState((prev) => ({
          ...prev,
          [questinonState.chosenAnswer]: {
            answer: "correct",
            icon: "showIcon",
          },
        }));
      }

      // Runs when the selected answer is incorrect
      return setOptionsState((prev) => ({
        ...prev,
        [questinonState.chosenAnswer]: { answer: "wrong", icon: "showIcon" },
        [questinonState.answer]: {
          answer: "correction",
          icon: "showIcon",
        },
      }));
    }

    // When goToNext state is true and have more questions to answer
    if (goToNext && questinonState.chosenAnswer && data.length !== currentQuestion + 1) {
      setCurrentQuestion((prev) => prev + 1);
      setQuestinonState(prev => ({
        ...prev,
        answer: correctAnswer(
      data[currentQuestion + 1].options,
          data[currentQuestion + 1].answer
        )
      }))
      return setAllStateToDefault();
    }

     // When goToNext state is true and have no more questions to answer and ready to navigate user to the result page
    if (goToNext && questinonState.chosenAnswer && data.length == currentQuestion + 1) { 
      setResultData((prev) => ({ ...prev, numberOfQuetsions: data.length, }))
      // Navigating user to the result page
      navigate(`/${subject}/result`);

      setCurrentQuestion(0);
      return setAllStateToDefault()
    }
  }

  // Options event listerner
  function handleOptionClick(option: string) {
        hideAnswerQuestion();
        return setQuestinonState((prev) => ({ ...prev, chosenAnswer: `${option}` }));
  }

// useEffect for handling subject/topics that are not currently part of our topics/data
   useEffect(() => {
     const subjectData = currentSubjectData(subject);
     if (!subjectData || subjectData.length === 0) {
       navigate("/");
     }
   });

  return (
      <ContentWrapper>
        <QuestionWrapper>
          {/* current question number */}
          <p className="questionNumber">
            {currentQuestion + 1} out of {data.length}
          </p>

          {/* Question */}
          <span className="question">{data[currentQuestion].question}</span>

          {/* Progress Bar */}
          <ProgressBar>
            <span
              style={{
                width: `${((currentQuestion + 1) / data.length) * 100}%`,
              }}
            ></span>
          </ProgressBar>
        </QuestionWrapper>

        {/* options  with the submit button*/}
        <ButtonsWrapper>
          <OptionsButton
            option={"a"}
            content={data[currentQuestion].options[0]}
            answerState={optionsState.a}
            onClick={() => handleOptionClick("a")}
            disabled={questinonState.disabled}
          />
          <OptionsButton
            option={"b"}
            content={data[currentQuestion].options[1]}
            answerState={optionsState.b}
            onClick={() => handleOptionClick("b")}
            disabled={questinonState.disabled}
          />
          <OptionsButton
            option={"c"}
            content={data[currentQuestion].options[2]}
            answerState={optionsState.c}
            onClick={() => handleOptionClick("c")}
            disabled={questinonState.disabled}
          />
          <OptionsButton
            option={"d"}
            content={data[currentQuestion].options[3]}
            answerState={optionsState.d}
            onClick={() => handleOptionClick("d")}
            disabled={questinonState.disabled}
          />
          <SubmitButton onClick={handleSubmit} content={submitButtonContent} />
          <SelectQuestion className={`${selectAnswer}`}>
            <span>
              <img src="/images/icon-incorrect.svg" alt="" />
            </span>{" "}
            <p>Please select an answer</p>{" "}
          </SelectQuestion>
        </ButtonsWrapper>
      </ContentWrapper>
  );
}

export default Subject
