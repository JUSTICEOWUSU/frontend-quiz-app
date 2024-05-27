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
    width: 60%;
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

interface OptionTypes {
  a: string;
  b: string;
  c: string;
  d: string;
}

interface QuestionStateTypes{
  answer: string;
  chosenAnswer: string;
  disabled: boolean;
}

function Subject() {
 
  const { subject } = useParams();
  const data = currentSubjectData(subject)[0].questions;  
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [goToNext, setGoToNext] = useState<boolean>(false);

  const questinonState: QuestionStateTypes = {
    answer: data[currentQuestion].answer,
    chosenAnswer: "",
    disabled: false
  };

  
  const [submitButtonContent, setSubmitButtonContent] = useState("submit answer");
  
  const [optionsState, setOptionsState] = useState<OptionTypes>({
    a: "",
    b: "",
    c: "",
    d: "",
  });

  function respondToSubmit() {
    if (!goToNext && questinonState.chosenAnswer) {
      questinonState.disabled = true;
      setGoToNext(true)
      setSubmitButtonContent("next question");

      if (questinonState.chosenAnswer == questinonState.answer){
        return setOptionsState((prev) => ({
          ...prev,
          [questinonState.chosenAnswer]: "correct",
        }));
      }

      return setOptionsState((prev) => ({
        ...prev,
        [questinonState.chosenAnswer]: "wrong",
        [correctAnswer(data[currentQuestion].options, questinonState.answer)]:
          "correct",
      }));  
    }

    console.log(questinonState.chosenAnswer);
    
    
    if (goToNext && questinonState.chosenAnswer) {
      setCurrentQuestion((prev) => prev + 1);
      setOptionsState({ a: "", b: "", c: "", d: "" });
      setSubmitButtonContent("submit answer");
      questinonState.disabled = false;
      setGoToNext(false);
      questinonState.chosenAnswer = "";
    }
 
  }

  function RespondToOptionA() {
    questinonState.chosenAnswer = "a"
  }


  function RespondToOptionB() {
        questinonState.chosenAnswer = "b";
  }


  function RespondToOptionC() {
    questinonState.chosenAnswer = "c"
  }

  
  function RespondToOptionD() {
    questinonState.chosenAnswer = "d"
  }

  return (
    <ContentWrapper>
      <QuestionWrapper>
        <p className="question-number">{ currentQuestion + 1} out of {data.length }</p>
        <span className="question">
          {
            data[currentQuestion].question
          }
        </span>
        <ProgressBar>
          <span></span>
        </ProgressBar>
      </QuestionWrapper>

      <ButtonsWrapper>
        <OptionsButton option={"a"} content={data[currentQuestion].options[0]} customClass={optionsState.a} onClick={RespondToOptionA} disabled={questinonState.disabled}/>
        <OptionsButton option={"b"} content={data[currentQuestion].options[1]} customClass={optionsState.b} onClick={RespondToOptionB} disabled={questinonState.disabled}/>
        <OptionsButton option={"c"} content={data[currentQuestion].options[2]} customClass={optionsState.c} onClick={RespondToOptionC} disabled={questinonState.disabled}/>
        <OptionsButton option={"d"} content={data[currentQuestion].options[3]} customClass={optionsState.d} onClick={RespondToOptionD} disabled={questinonState.disabled}/>
        <SubmitButton onClick={respondToSubmit} content={ submitButtonContent} />
      </ButtonsWrapper>
    </ContentWrapper>
  );
}

export default Subject








