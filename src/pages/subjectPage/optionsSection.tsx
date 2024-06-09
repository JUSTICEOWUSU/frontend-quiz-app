import styled from "styled-components";
import { ModeContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import correctAnswer, { currentSubjectData } from "../pageUtils";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { ButtonsWrapper } from "../../components/layout/SharedLayouts"; 
import OptionsButton from "../../components/optionsButton/OptionsButton";
import { quizeContext } from "../../AppContext/quizeContext/quizeContext";
import { ToggleContext } from "../../AppContext/toggleContext/toggleContext";


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
  // --> Using the quizeContext(The quize algorithm stateManager) <--//
  const { quizeContextData, setQuizeContextData } = useContext(quizeContext);
  // --> Using the ModeContext(The theme stateManager) <--//
  const { colorMode, setColorMode } = useContext(ModeContext);
  const {toggleState, setToggleState } = useContext(ToggleContext);


  // Obtaining the subject/topic from the url parameter
  const { subject } = useParams();

  // Extracting data for the selected subject/topic (using url params)
  const data = currentSubjectData(subject)[0]?.questions || [
    { question: "", options: [""], answer: "" },
  ];

  const [focuseButton, setFocusedBuutton] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Hide select an answefr error message
  function hideAnswerQuestion() {
    if (!quizeContextData.subjectPageStates.selectAnswerErrorMessage) {
      return setQuizeContextData((prev) => ({
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
    return setQuizeContextData((prev) => ({
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
    if (!quizeContextData.subjectPageStates.questionState.chosenAnswer) {
      if (focuseButton) setFocusedBuutton(false);
      return setQuizeContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          selectAnswerErrorMessage: "",
        },
      }));
    }

    // checking if an answer has been selected
    if (
      !quizeContextData.subjectPageStates.moveToNextQuestion &&
      quizeContextData.subjectPageStates.questionState.chosenAnswer
    ) {
      setQuizeContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          // Setting move to Next to true and changing the submit button content from "SUBMIT ANSWER" tO "NEXT QUESTION"
          moveToNextQuestion: true,
          submitButtonMessage: `${
            data.length ===
            quizeContextData.subjectPageStates.questionState.currentQuestionTracker +
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
        quizeContextData.subjectPageStates.questionState.chosenAnswer ===
        quizeContextData.subjectPageStates.questionState.answer
      ) {
        // Updating the number of passed questions
        setQuizeContextData((prev) => ({
          ...prev,
          resultPageStates: {
            ...prev.resultPageStates,
            numberOfPasssedQuestions:
              quizeContextData.resultPageStates.numberOfPasssedQuestions + 1,
          },
          subjectPageStates: {
            ...prev.subjectPageStates,
          },
        }));

        // Updating the answer options in the answerOptions(quizeCONTEXTDATA)
        return setQuizeContextData((prev) => ({
          ...prev,
          subjectPageStates: {
            ...prev.subjectPageStates,
            answerOptions: {
              ...prev.subjectPageStates.answerOptions,
              // Selecting the chosen answer
              [quizeContextData.subjectPageStates.questionState.chosenAnswer]: {
                answer: "correct",
                icon: "showIcon",
              },
            },
          },
        }));
      }

      // Runs when the selected answer is incorrect
      // if (focuseButton) setFocusedBuutton(false);
      return setQuizeContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          answerOptions: {
            ...prev.subjectPageStates.answerOptions,
            [quizeContextData.subjectPageStates.questionState.chosenAnswer]: {
              answer: "wrong",
              icon: "showIcon",
            },
            [quizeContextData.subjectPageStates.questionState.answer]: {
              answer: "correction",
              icon: "showIcon",
            },
          },
        },
      }));
    }

    // When goToNext state is true and have more questions to answer
    if (
      quizeContextData.subjectPageStates.moveToNextQuestion &&
      quizeContextData.subjectPageStates.questionState.chosenAnswer &&
      data.length !==
        quizeContextData.subjectPageStates.questionState.currentQuestionTracker + 1
    ) {
      setQuizeContextData((prev) => ({
        ...prev,
        subjectPageStates: {
          ...prev.subjectPageStates,
          questionState: {
            ...prev.subjectPageStates.questionState,
            currentQuestionTracker:
              quizeContextData.subjectPageStates.questionState
                .currentQuestionTracker + 1,
            answer: correctAnswer(
              data[
                quizeContextData.subjectPageStates.questionState
                  .currentQuestionTracker + 1
              ].options,
              data[
                quizeContextData.subjectPageStates.questionState
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
      quizeContextData.subjectPageStates.moveToNextQuestion &&
      quizeContextData.subjectPageStates.questionState.chosenAnswer &&
      data.length ==
        quizeContextData.subjectPageStates.questionState.currentQuestionTracker + 1
    ) {
      // Updating the quizeContextData to default(Preparing to navigate to the result page);
      setQuizeContextData((prev) => ({
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
      if (toggleState) setToggleState("");
      if (focuseButton) setFocusedBuutton(false);
      // return if an answer has already been submited
      if (quizeContextData.subjectPageStates.questionState.disabled) return;

      // Hide select an answer error message 
      hideAnswerQuestion();

      // Reseting the chosen answer to the pressed key
      return setQuizeContextData((prev) => ({
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
      // Runs if toggle switch is already focused
      if (toggleState) {
        window.localStorage.setItem(
          "mode",
          `${colorMode == "light" ? "dark" : "light"}`
        );
        return setColorMode(colorMode == "light" ? "dark" : "light");
      }

      return handleSubmit();
    } else if (event.key.toLowerCase() === "l") {
      // Disfocusing the submit button if it's already focused
      if (focuseButton) setFocusedBuutton(false);
      // hideAnswerQuestion();

      //Disfocusing the chosen answer if an option is already focused
      if (quizeContextData.subjectPageStates.questionState.chosenAnswer) {
        setQuizeContextData((prev) => ({
          ...prev,
          subjectPageStates: {
            ...prev.subjectPageStates,
            questionState: {
              ...prev.subjectPageStates.questionState,
              chosenAnswer: ``,
            },
          },
        }));
      }
      
      // Focussing the toggle switch if it's not focused
      if(!toggleState) return setToggleState("focuse");

    } else if (event.key === "Tab") {
      event.preventDefault();

      // Disfocusing the toggle switch if it's already focused
      if (toggleState) setToggleState("");

       // Focussing the submit Button if it's not focused
      if (!focuseButton) return setFocusedBuutton(true);
      return;
    }
      return;
  }

  // A function to focus the chosen answer
  function focusedElement(chosenElement: string) {
    if (
      chosenElement === quizeContextData.subjectPageStates.questionState.chosenAnswer
    ) {
      return true;
    };
    
    return false;
  }

  // An Effect to focus the invisible input element on page render
  useEffect(() => {
    inputRef.current?.focus();

  });

  return (
    <ButtonsWrapper
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <input
        type="text"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
        tabIndex={0}
        onKeyDown={(event) => handleKeyDown(event)}
        ref={inputRef}
      />
      <OptionsButton
        focused={focusedElement("a") ? "focused" : ""}
        option={"a"}
        content={
          data[
            quizeContextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[0]
        }
        answerState={quizeContextData.subjectPageStates.answerOptions.a}
        disabled={quizeContextData.subjectPageStates.questionState.disabled}
      />
      <OptionsButton
        option={"b"}
        focused={focusedElement("b") ? "focused" : ""}
        content={
          data[
            quizeContextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[1]
        }
        answerState={quizeContextData.subjectPageStates.answerOptions.b}
        disabled={quizeContextData.subjectPageStates.questionState.disabled}
      />
      <OptionsButton
        option={"c"}
        focused={focusedElement("c") ? "focused" : ""}
        content={
          data[
            quizeContextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[2]
        }
        answerState={quizeContextData.subjectPageStates.answerOptions.c}
        disabled={quizeContextData.subjectPageStates.questionState.disabled}
      />
      <OptionsButton
        option={"d"}
        focused={focusedElement("d") ? "focused" : ""}
        content={
          data[
            quizeContextData.subjectPageStates.questionState.currentQuestionTracker
          ].options[3]
        }
        answerState={quizeContextData.subjectPageStates.answerOptions.d}
        disabled={quizeContextData.subjectPageStates.questionState.disabled}
      />
      <SubmitButton
        content={quizeContextData.subjectPageStates.submitButtonMessage}
        focused={
          focuseButton
            ? "linear-gradient(0deg,rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)),#a729f5"
            : ""
        }
      />
      <SelectQuestionErrorMessage
        className={`${quizeContextData.subjectPageStates.selectAnswerErrorMessage}`}
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
