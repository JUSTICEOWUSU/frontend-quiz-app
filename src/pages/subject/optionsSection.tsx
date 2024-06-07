import { useContext, useEffect, useRef, useState, } from "react";
import styled from "styled-components";
import { appContext } from "../../context/contexts";
import { useParams, useNavigate } from "react-router-dom"
import correctAnswer, { currentSubjectData } from "../pageUtils";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { ButtonsWrapper } from "../../components/layout/SharedLayouts"; 
import OptionsButton from "../../components/optionsButton/OptionsButton";
import { ModeContext } from "../../App";



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
  // --> Using the appContext(The app stateManager) <--//
  const { contextData, setContextData } = useContext(appContext);
  // --> Using the ModeContext(The theme stateManager) <--//
  const { colorMode, setColorMode } = useContext(ModeContext);

  // Obtaining the subject/topic from the url parameter
  const { subject } = useParams();

  // Extracting data for the selected subject/topic (using url params)
  const data = currentSubjectData(subject)[0]?.questions || [
    { question: "", options: [""], answer: "" },
  ];

  const [focuseButton, setFocusedBuutton] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);

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
    if (!focuseButton) return setFocusedBuutton(true);

    // Check and run if no answer is selected
    if (!contextData.subjectPageStates.questionState.chosenAnswer) {
      if (focuseButton) setFocusedBuutton(false);
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
          // Setting move to Next to true and changing the submit button content from "SUBMIT ANSWER" tO "NEXT QUESTION"
          moveToNextQuestion: true,
          submitButtonMessage: `${
            data.length ===
            contextData.subjectPageStates.questionState.currentQuestionTracker +
              1
              ? "see results"
              : "next question"
          }`,
          questionState: {
            ...prev.subjectPageStates.questionState,
            // Disabling the buttons after submiting answer
            disabled: true,
          },
        },
      }));

      // Checking if the selected answer is correct and goToNext(question) is false;
      if (
        contextData.subjectPageStates.questionState.chosenAnswer ===
        contextData.subjectPageStates.questionState.answer
      ) {
        // Updating the number of passed questions
        setContextData((prev) => ({
          ...prev,
          resultPageStates: {
            ...prev.resultPageStates,
            numberOfPasssedQuestions:
              contextData.resultPageStates.numberOfPasssedQuestions + 1,
          },
          subjectPageStates: {
            ...prev.subjectPageStates,
          },
        }));

        // Updating the answer options in the answerOptions(CONTEXTDATA)
        return setContextData((prev) => ({
          ...prev,
          subjectPageStates: {
            ...prev.subjectPageStates,
            answerOptions: {
              ...prev.subjectPageStates.answerOptions,
              // Selecting the chosen answer
              [contextData.subjectPageStates.questionState.chosenAnswer]: {
                answer: "correct",
                icon: "showIcon",
              },
            },
          },
        }));
      }

      // Runs when the selected answer is incorrect
      // if (focuseButton) setFocusedBuutton(false);
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
      if (focuseButton) setFocusedBuutton(false);
      return setAllStateToDefault();
    }

    // When goToNext state is true and have no more questions to answer and ready to navigate user to the result page
    if (
      contextData.subjectPageStates.moveToNextQuestion &&
      contextData.subjectPageStates.questionState.chosenAnswer &&
      data.length ==
        contextData.subjectPageStates.questionState.currentQuestionTracker + 1
    ) {
      // Updating the contextData to default(Preparing to navigate to the result page);
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
            answer: "",
          },
        },
      }));

      // Navigating user to the result page
      navigate(`/${subject}/result`);
      return setAllStateToDefault();
    }
  }

  // A function that handle all keyDowns in the subject page
  function handleKeyDown(event: React.KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key === "a" || key === "b" || key === "c" || key === "d") {
      if (contextData.subjectPageStates.questionState.disabled) return;
      hideAnswerQuestion();
      return setContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          questionState: {
            ...prev.subjectPageStates.questionState,
            chosenAnswer: `${key}`,
          },
        },
      }));
    } else if (event.key === "Enter") {
      return handleSubmit();
    } else if (event.key.toLowerCase() === "l") {
      window.localStorage.setItem(
        "mode",
        `${colorMode == "light" ? "dark" : "light"}`
      );
      return setColorMode(colorMode == "light" ? "dark" : "light");
    }
    return;
  }

  // A function to focus the chosen answer
  function focusedElement(chosenElement: string) {
    if (
      chosenElement === contextData.subjectPageStates.questionState.chosenAnswer
    )
      return true;
    return false;
  }

  // An Effect to focus the buttons contianer on page render
  useEffect(() => {
    divRef.current?.focus();
  }, []);

  return (
    <ButtonsWrapper
      tabIndex={0}
      ref={divRef}
      style={{ outline: "none" }}
      onKeyDown={(event) => handleKeyDown(event)}
    >
      <OptionsButton
        focused={focusedElement("a") ? "focused" : ""}
        option={"a"}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[0]
        }
        answerState={contextData.subjectPageStates.answerOptions.a}
        disabled={contextData.subjectPageStates.questionState.disabled}
      />
      <OptionsButton
        option={"b"}
        focused={focusedElement("b") ? "focused" : ""}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[1]
        }
        answerState={contextData.subjectPageStates.answerOptions.b}
        disabled={contextData.subjectPageStates.questionState.disabled}
      />
      <OptionsButton
        option={"c"}
        focused={focusedElement("c") ? "focused" : ""}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[2]
        }
        answerState={contextData.subjectPageStates.answerOptions.c}
        disabled={contextData.subjectPageStates.questionState.disabled}
      />
      <OptionsButton
        option={"d"}
        focused={focusedElement("d") ? "focused" : ""}
        content={
          data[
            contextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[3]
        }
        answerState={contextData.subjectPageStates.answerOptions.d}
        disabled={contextData.subjectPageStates.questionState.disabled}
      />
      <SubmitButton
        content={contextData.subjectPageStates.submitButtonMessage}
        focused={
          focuseButton
            ? "linear-gradient(0deg,rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)),#a729f5"
            : ""
        }
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

export default OptionsSection;
