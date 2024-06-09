import styled from "styled-components";
import {  useContext, useEffect } from "react";
// importing quizeContext(context for managing the app States )
import { quizeContext } from "../../AppContext/quizeContext/quizeContext";

import { useParams, useNavigate } from "react-router-dom";
import OptionsSection from "./optionsSection";
// importing custom utils function that manages the app data
import correctAnswer, { currentSubjectData } from "../pageUtils";
import { ContentWrapper } from "../../components/layout/SharedLayouts"; 


// Page tages with styles
const QuestionWrapper = styled.div`
  padding: 0;

  .questionNumber {
    margin-top: 0;
    font-size: 0.875rem;
    font-family: "Rubik Variable Italic", "Rubik Italic", sans-serif;

    color: ${({ theme }) =>
      theme.mode == "dark"
        ? theme.darkMode.miniText
        : theme.lightMode.miniText};
  }

  .question {
    display: block;
    font-weight: 500;
    font-size: 1.25rem;
    margin: 0.75rem 0 1.5rem;

    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};
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
      margin-bottom: 0;
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


function Subject() {
  const navigate = useNavigate();
  const { quizeContextData, setQuizeContextData } = useContext(quizeContext);

  // Obtaining the subject/topic from the url parameter
  const { subject } = useParams();

  const data = currentSubjectData(subject)[0]?.questions || [
    { question: "", options: [""], answer: "" },
  ];

  // Function for setting subject first question answer
  function setSubjectInitialAnswer() {
    if (!quizeContextData.subjectPageStates.questionState.answer) {
      return setQuizeContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          questionState: {
            ...prev.subjectPageStates.questionState,
            answer: correctAnswer(
              data[
                quizeContextData.subjectPageStates.questionState
                  .currentQuestionTracker
              ].options,
              data[
                quizeContextData.subjectPageStates.questionState
                  .currentQuestionTracker
              ].answer
            ),
          },
        },
      }));
    }
    return;
  }

  // useEffect for handling subject/topics that are not currently part of our topics/data
  useEffect(() => {
    const subjectData = currentSubjectData(subject);
    // Checking if selected subject/topic is present in our topics list
    if (!subjectData || subjectData.length === 0) {
      return navigate("/Error");
    }

    // Setting subject first question answer
    setSubjectInitialAnswer();
  },[]);

  return (
    <ContentWrapper>
      <QuestionWrapper>
        {/* current question number */}
        <p className="questionNumber">
          {quizeContextData.subjectPageStates.questionState.currentQuestionTracker +
            1}{" "}
          out of {data.length}
        </p>

        {/* Question */}
        <span className="question">
          {
            data[
              quizeContextData.subjectPageStates.questionState.currentQuestionTracker
            ].question
          }
        </span>

        {/* Progress Bar */}
        <ProgressBar>
          <span
            style={{
              width: `${
                ((quizeContextData.subjectPageStates.questionState
                  .currentQuestionTracker +
                  1) /
                  data.length) *
                100
              }%`,
            }}
          ></span>
        </ProgressBar>
      </QuestionWrapper>

      {/* options  with the submit button*/}
      <OptionsSection />
    </ContentWrapper>
  );
}

export default Subject
