import { useContext, } from "react";
import styled from "styled-components";
import { appContext } from "../../context/contexts";
import { useParams, useNavigate } from "react-router-dom"
import correctAnswer, { currentSubjectData } from "../pageUtils";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { ButtonsWrapper } from "../../components/layout/SharedLayouts"; 
import OptionsButton from "../../components/optionsButton/OptionsButton";


// This is an error message component that shows up when no answer is chosen
const SelectQuestionErrorMessage = styled.div`
  margin: 0;
  width: auto;
  gap: 0.5rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: visiblity 0.5s linear;

  p {
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: 1.125rem;
    font-family: ${({ theme }) => theme.fontFamily};
  }

  span {
    width: 2rem;
    height: 2rem;
    display: block;
    position: relative;

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


function OptionsSection() {
  const navigate = useNavigate();
  // --> CUSTOM STATES/VARAIBLES FOR THE SUBJECT PAGE AND QUESTINING LOGIC <--//
  const { contextData, setContextData } = useContext(appContext);

  // Obtaining the subject/topic from the url parameter
  const { subject } = useParams();

  const data = currentSubjectData(subject)[0]?.questions || [
    { question: "", options: [""], answer: "" },
  ];

  // Hide select an answefr error message
  function hideAnswerQuestion() {
    if (!contextData.subjectPageStates.selectAnswerErrorMessage) {
      return setContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          selectAnswerErrorMessage: "hideSelectAnswer",
        },
      }));
    }

    return;
  }

  // Set  states values to default
  function setAllStateToDefault() {
    return setContextData((prev) => ({
      ...prev,
      subjectPageStates: {
        ...prev.subjectPageStates,
        answerOptions: {
          a: { answer: "", icon: "" },
          b: { answer: "", icon: "" },
          c: { answer: "", icon: "" },
          d: { answer: "", icon: "" },
        },
        moveToNextQuestion: false,
        submitButtonMessage: "submit answer",
        questionState: {
          ...prev.subjectPageStates.questionState,
          chosenAnswer: "",
          disabled: false,
        },
      },
    }));
  }

  // Submit button onclick event listeenr
  function handleSubmit() {
    console.log("enterrrrr");
    if (!contextData.subjectPageStates.questionState.chosenAnswer) {
      return setContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          selectAnswerErrorMessage: "",
        },
      }));
    }

    // checking if an answer has been selected
    if (
      !contextData.subjectPageStates.moveToNextQuestion &&
      contextData.subjectPageStates.questionState.chosenAnswer
    ) {
      setContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          moveToNextQuestion: true,
          submitButtonMessage: `${
            data.length ==
            contextData.subjectPageStates.questionState.currentQuestionTracker +
              1
              ? "see results"
              : "next question"
          }`,
          questionState: {
            ...prev.subjectPageStates.questionState,
            disabled: true,
          },
        },
      }));

      // Checking if the selected answer is correct and goToNext(question) is false;
      if (
        contextData.subjectPageStates.questionState.chosenAnswer ==
        contextData.subjectPageStates.questionState.answer
      ) {
        // updating the number of passed questions
        setContextData((prev) => ({
          ...prev,
          resultPageStates: {
            ...prev.resultPageStates,
            numberOfPasssedQuestions:
              contextData.resultPageStates.numberOfPasssedQuestions + 1,
          },
        }));

        return setContextData((prev) => ({
          ...prev,
          subjectPageStates: {
            ...prev.subjectPageStates,
            answerOptions: {
              ...prev.subjectPageStates.answerOptions,
              [contextData.subjectPageStates.questionState.chosenAnswer]: {
                answer: "correct",
                icon: "showIcon",
              },
            },
          },
        }));
      }

      // Runs when the selected answer is incorrect
      return setContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          answerOptions: {
            ...prev.subjectPageStates.answerOptions,
            [contextData.subjectPageStates.questionState.chosenAnswer]: {
              answer: "wrong",
              icon: "showIcon",
            },
            [contextData.subjectPageStates.questionState.answer]: {
              answer: "correction",
              icon: "showIcon",
            },
          },
        },
      }));
    }

    // When goToNext state is true and have more questions to answer
    if (
      contextData.subjectPageStates.moveToNextQuestion &&
      contextData.subjectPageStates.questionState.chosenAnswer &&
      data.length !==
        contextData.subjectPageStates.questionState.currentQuestionTracker + 1
    ) {
      setContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          questionState: {
            ...prev.subjectPageStates.questionState,
            currentQuestionTracker:
              contextData.subjectPageStates.questionState
                .currentQuestionTracker + 1,
            answer: correctAnswer(
              data[
                contextData.subjectPageStates.questionState
                  .currentQuestionTracker + 1
              ].options,
              data[
                contextData.subjectPageStates.questionState
                  .currentQuestionTracker + 1
              ].answer
            ),
          },
        },
      }));
      return setAllStateToDefault();
    }

    // When goToNext state is true and have no more questions to answer and ready to navigate user to the result page
    if (
      contextData.subjectPageStates.moveToNextQuestion &&
      contextData.subjectPageStates.questionState.chosenAnswer &&
      data.length ==
        contextData.subjectPageStates.questionState.currentQuestionTracker + 1
    ) {
      // setResultData((prev) => ({ ...prev, numberOfQuetsions: data.length, }))
      setContextData((prev) => ({
        ...prev,
        resultPageStates: {
          ...prev.resultPageStates,
          numberOfQuetsions: data.length,
        },
        subjectPageStates: {
          ...prev.subjectPageStates,
          questionState: {
            ...prev.subjectPageStates.questionState,
            currentQuestionTracker: 0,
            answer:""
          },
        },
      }));

      // Navigating user to the result page
      navigate(`/${subject}/result`);
      return setAllStateToDefault();
    }
  }

  function handleOptionClick(option: string) {
    hideAnswerQuestion();
    // return setQuestinonState((prev) => ({ ...prev, chosenAnswer: `${option}` }));
    return setContextData((prev) => ({
      ...prev,
      subjectPageStates: {
        ...prev.subjectPageStates,
        questionState: {
          ...prev.subjectPageStates.questionState,
          chosenAnswer: `${option}`,
        },
      },
    }));
  }

  return (
    <ButtonsWrapper
      tabIndex={0}
      // ref={optionsRef}
      style={{ outline: "none" }}
    >
      <OptionsButton
        option={"a"}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[0]
        }
        answerState={contextData.subjectPageStates.answerOptions.a}
        onClick={() => handleOptionClick("a")}
        disabled={contextData.subjectPageStates.questionState.disabled}
        // refItem={(ele) => (buttonRef.current[0] = ele)}
      />
      <OptionsButton
        option={"b"}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[1]
        }
        answerState={contextData.subjectPageStates.answerOptions.b}
        onClick={() => handleOptionClick("b")}
        disabled={contextData.subjectPageStates.questionState.disabled}
        // refItem={(ele) => (buttonRef.current[1] = ele)}
      />
      <OptionsButton
        option={"c"}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[2]
        }
        // refItem={(ele) => (buttonRef.current[2] = ele)}
        answerState={contextData.subjectPageStates.answerOptions.c}
        onClick={() => handleOptionClick("c")}
        disabled={contextData.subjectPageStates.questionState.disabled}
      />
      <OptionsButton
        option={"d"}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[3]
        }
        // refItem={(ele) => (buttonRef.current[3] = ele)}
        answerState={contextData.subjectPageStates.answerOptions.d}
        onClick={() => handleOptionClick("d")}
        disabled={contextData.subjectPageStates.questionState.disabled}
      />
      <SubmitButton
        onClick={handleSubmit}
        content={contextData.subjectPageStates.submitButtonMessage}
      />
      <SelectQuestionErrorMessage
        className={`${contextData.subjectPageStates.selectAnswerErrorMessage}`}
      >
        <span>
          <img src="/images/icon-incorrect.svg" alt="" />
        </span>{" "}
        <p>Please select an answer</p>{" "}
      </SelectQuestionErrorMessage>
    </ButtonsWrapper>
  );
}

export default OptionsSection
