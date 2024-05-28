import styled from "styled-components"
import OptionsButton from "../../components/optionsButton/OptionsButton";
import { ButtonsWrapper, ContentWrapper } from "../../components/layout/SharedLayouts"; 
import SubmitButton from "../../components/submitButton/SubmitButton";
import { useState } from "react";
import { useParams } from "react-router-dom";
import correctAnswer from "./utils";
import { currentSubjectData } from "./utils";


const QuestionWrapper = styled.div`
  padding: 0;
  .question-number {
    font-size: 0.875rem;
    margin-top: 0;
    color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.miniText : theme.lightMode.miniText};
    font-family: "Rubik Variable Italic", "Rubik Italic", sans-serif;
  }

  .question {
    font-family: "Rubik Variable ", "Rubik", sans-serif;
    font-weight: 500;
    font-size: 1.25rem;
    display: block;
    margin: 0.75rem 0 1.5rem;
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    .question-number {
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
  }
`;

const ProgressBar = styled.span`
  display: block;
  width: 100%;
  height: 0.6rem;
  padding: 0.25rem;
  background-color: ${({ theme }) =>
    theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button};
  border-radius: 62rem;

  span {
    display: block;
    transition: all 600ms ease-in-out;
    height: 100%;
    border-radius: 6.5rem;
    background-color: ${({ theme }) => theme.primaryBlue};
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    height: 1rem;
  }

  @media (min-width: 1050px) {
    margin-top: 7.6875rem;
  }
`;

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

function Subject() {
  // --> CUSTOM STATES/VARAIBLES FOR THE SUBJECT PAGE AND QUESTINING LOGIC <--//

  // Obtaining the subject/topic from the url parameter
  const { subject } = useParams();

  // Obtaining the data of the topic/subject
  const data = currentSubjectData(subject)[0].questions;

  // A state that controls eitrher to move to next question or not
  const [goToNext, setGoToNext] = useState<boolean>(false);

  // A state tracker for the current question
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // A state that controls the text content of the submit button e.g "submit answer","next question" and "see result"
  const [submitButtonContent, setSubmitButtonContent] = useState("submit answer");

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

  // Submit button onclick event listeenr
  function respondToSubmit() {
    // checking if an answer has been selected
    if (!goToNext && questinonState.chosenAnswer) {
      setQuestinonState((prev) => ({ ...prev, disabled: true }));
      setGoToNext(true);
      setSubmitButtonContent("next question");

      // Checking if the selected answer is correct and goToNext(question) is false;
      if (questinonState.chosenAnswer == questinonState.answer) {
        return setOptionsState((prev) => ({
          ...prev,
          [questinonState.chosenAnswer]: {
            answer: "correct",
            icon: "showIcon",
          },
        }));
      }

      return setOptionsState((prev) => ({
        ...prev,
        [questinonState.chosenAnswer]: { answer: "wrong", icon: "showIcon" },
        [questinonState.answer]: {
          answer: "correction",
          icon: "showIcon",
        },
      }));
    }

    // When goToNext state is true
    if (goToNext && questinonState.chosenAnswer) {
      setCurrentQuestion((prev) => prev + 1);
      setOptionsState({
        a: { answer: "", icon: "" },
        b: { answer: "", icon: "" },
        c: { answer: "", icon: "" },
        d: { answer: "", icon: "" },
      });
      setSubmitButtonContent("submit answer");
      setGoToNext(false);
      setQuestinonState((prev) => ({
        ...prev,
        chosenAnswer: "a",
        disabled: false,
      }));
    }
  }

  // Option A event listerner
  function RespondToOptionA() {
    setQuestinonState((prev) => ({ ...prev, chosenAnswer: "a" }));
  }

  // Option B event listerner
  function RespondToOptionB() {
    setQuestinonState((prev) => ({ ...prev, chosenAnswer: "b" }));
  }

  // Option C event listerner
  function RespondToOptionC() {
    setQuestinonState((prev) => ({ ...prev, chosenAnswer: "c" }));
  }

  // Option D event listerner
  function RespondToOptionD() {
    setQuestinonState((prev) => ({ ...prev, chosenAnswer: "d" }));
  }


  return (
    <ContentWrapper>
      <QuestionWrapper>

        {/* current question number */}
        <p className="question-number">
          {currentQuestion + 1} out of {data.length}
        </p>

        {/* Question */}
        <span className="question">{data[currentQuestion].question}</span>

        {/* Progress Bar */}
        <ProgressBar>
          <span
            style={{ width: `${((currentQuestion + 1) / data.length) * 100}%` }}
          ></span>
        </ProgressBar>

      </QuestionWrapper>

      {/* options  with the submit button*/}
      <ButtonsWrapper>
        <OptionsButton
          option={"a"}
          content={data[currentQuestion].options[0]}
          answerState={optionsState.a}
          onClick={RespondToOptionA}
          disabled={questinonState.disabled}
        />
        <OptionsButton
          option={"b"}
          content={data[currentQuestion].options[1]}
          answerState={optionsState.b}
          onClick={RespondToOptionB}
          disabled={questinonState.disabled}
        />
        <OptionsButton
          option={"c"}
          content={data[currentQuestion].options[2]}
          answerState={optionsState.c}
          onClick={RespondToOptionC}
          disabled={questinonState.disabled}
        />
        <OptionsButton
          option={"d"}
          content={data[currentQuestion].options[3]}
          answerState={optionsState.d}
          onClick={RespondToOptionD}
          disabled={questinonState.disabled}
        />
        <SubmitButton onClick={respondToSubmit} content={submitButtonContent} />
      </ButtonsWrapper>
    </ContentWrapper>
  );
}

export default Subject








