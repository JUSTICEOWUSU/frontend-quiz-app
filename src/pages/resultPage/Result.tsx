import styled from "styled-components";
import { ModeContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { quizeContext } from "../../AppContext/quizeContext/quizeContext";
import InvisibleInput from "../../components/invisibleInput/InvisibleInput";
import { ToggleContext } from "../../AppContext/toggleContext/toggleContext";
import { currentSubjectData,handleInputs,handleMobileKeyDown } from "../../appUtils/pagesUtils/pageUtils";


// Importing layouts from the SharedLayout compenent
import {
  ButtonsWrapper,
  TitleWrapper,
  ContentWrapper,
} from "../layouts/SharedLayouts";

const ResultsCard = styled.div<{ subject: string }>`
  width: 100%;
  display: flex;
  padding: 2rem;
  height: 15.125rem;
  align-items: center;
  border-radius: 0.75rem;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.5s linear;
  
  background-color: ${({ theme }) =>
    theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button};
  box-shadow: ${({ theme }) =>
    theme.mode == "dark"
    ? "0px 16px 40px rgba(49, 62, 81, 0.14)"
    : "0 1rem 2.5rem rgba(143, 160, 193, 0.14)"};

  .subject {
    gap: 1rem;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;

    span {
      width: 2.5rem;
      height: 2.5rem;
      display: block;
      border-radius: 0.5rem;
      background: ${({ subject }) =>
        subject == "HTML"
          ? "#FFF1E9"
          : subject == "CSS"
          ? "#E0FDEF"
          : subject == "JavaScript"
          ? "#EBF0FF"
          : "#F6E7FF"};

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      font-weight: 500;
      font-size: 1.125rem;
      font-family: ${({ theme }) => theme.fontFamily};
      margin:0;
    }
  }

  .score {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 5.5rem;
    font-family: ${({ theme }) => theme.fontFamily};
  }

  span {
    font-weight: 400;
    font-size: 1.125rem;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) =>
      theme.mode == "dark"
        ? theme.darkMode.miniText
        : theme.lightMode.miniText};
  }

  @media (min-width: 640px) {
    padding: 3rem;
    height: 24.25rem;
    border-radius: 1.5rem;

    .subject {
      span {
        width: 3.5rem;
        height: 3.5rem;
      }

      h4 {
        font-size: 1.75rem;
      }
    }

    .score {
      font-size: 9rem;
    }

    span {
      font-size: 1.5rem;
    }
  }
`;


function Result() {
  const navigate = useNavigate();
  // Obtaining the subject/topic from the url parameter
  const { subject } = useParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { colorMode, setColorMode } = useContext(ModeContext);
  const [focuseButton, setFocusedButton] = useState<boolean>(false);
  const { toggleState, setToggleState } = useContext(ToggleContext);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const { quizeContextData, setQuizeContextData } = useContext(quizeContext);


  // A function that handle all keyDowns in the result page
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === ' ') {
      // Runs if toggle switch is already focused
      if (toggleState) {
        window.localStorage.setItem(
          "mode",
          `${colorMode == "light" ? "dark" : "light"}`
        );
        return setColorMode(colorMode == "light" ? "dark" : "light");
      }

      // Runs if button is already focused
      if (focuseButton) {
        setQuizeContextData((prev) => ({
          ...prev,
          resultPageStates: {
            numberOfPasssedQuestions: 0,
            numberOfQuetsions: 0,
          },
        }));
        setFocusedButton(false);
        return navigate("/");
      }

      if (!focuseButton) return setFocusedButton(true);
      
    } else if (event.key.toLowerCase() === "l") {
      // Defocusing the playAgain button
      setFocusedButton(false);

      // Focussing the toggle button if it's not focused
      if (!toggleState) return setToggleState("focuse");
    } else if (event.key === "Tab" || event.key.toLowerCase() === "u") {
      event.preventDefault();
      // Defocusing all focused element
            if (toggleState) setToggleState("");
      if (!focuseButton) return setFocusedButton(true);
      return;
    }
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    return handleInputs(event, isMobile, handleKeyDown);
  };

  // useEffect for handling subject/topics that are not currently part of our data
  useEffect(() => {
    const subjectData = currentSubjectData(subject);
    if (!subjectData || subjectData.length === 0) {
      navigate("/Error");
    }
    // Focusing the result page container on page load or render
    inputRef.current?.focus();
  });

  return (
    <ContentWrapper>
      {/* Invisible input element for the page navigation */}
      <InvisibleInput
        handleKeyDown={(e) => {
          isMobile ? handleMobileKeyDown(e) : handleKeyDown(e);
        }}
        handleInput={handleInput}
        inputRef={inputRef}
      />
      <TitleWrapper>
        <h1>
          Quiz completed <br></br>
          <span>You scored...</span>
        </h1>
      </TitleWrapper>

      <ButtonsWrapper>
        <ResultsCard subject={subject || ""}>
          <div className="subject">
            <span>
              <img
                loading="lazy"
                srcSet={
                  subject?.toLowerCase() === "javascript"
                    ? "/images/icon-js.svg"
                    : `/images/icon-${subject?.toLowerCase()}.svg`
                }
                src={
                  subject?.toLowerCase() === "javascript"
                    ? "/images/icon-js.svg"
                    : `/images/icon-${subject?.toLowerCase()}.svg`
                }
                alt={subject}
              />
            </span>
            <h4>{subject}</h4>
          </div>

          {/* Result marks */}
          <p className="score">
            {quizeContextData.resultPageStates.numberOfPasssedQuestions}
          </p>

          <span style={{ fontWeight: 400 }}>
            out of {quizeContextData.resultPageStates.numberOfQuetsions}
          </span>
        </ResultsCard>
        <SubmitButton
          focused={
            focuseButton
              ? "linear-gradient(0deg,rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)),#a729f5"
              : ""
          }
          content="play again"
        />
      </ButtonsWrapper>
    </ContentWrapper>
  );
}

export default Result;
