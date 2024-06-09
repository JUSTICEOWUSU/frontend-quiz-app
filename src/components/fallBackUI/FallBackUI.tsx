import styled from 'styled-components'
import { useState,useContext,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../submitButton/SubmitButton'
import { quizeContext } from '../../AppContext/quizeContext/quizeContext';
import { ToggleContext } from '../../AppContext/toggleContext/toggleContext';
import { ModeContext } from "../../App";


const FallBackContainer = styled.div`
  width: 100%;
  margin: auto;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) =>
    theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};

  .error {
    width: auto;
    margin: auto;
    margin-top: 5rem;
    font-size: 5.5rem;
    font-weight: lighter;
    text-align: center;
  }

  .title {
    text-transform: uppercase;
    font-size: 1rem;
    margin: auto;
    text-align: center;
  }

  .message {
    margin: auto;
    text-align: center;
  }

  .empty {
    width: 100px;
    display: block;
    margin: 1rem auto;
    height: 1px;
    background-color: gray;
  }

  .btnContainer {
    width: 100%;
    display: block;
    margin: auto;
    margin-top: 2rem;
  }

  @media (min-width: 640px) {
    .error {
      margin-top: unset;
      font-size: 9rem;
    }

    .title {
      font-size: 1.5rem;
    }
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    .btnContainer {
      width: 30rem;
    }
  }
`;

function FallBackUI() {
  const navigate = useNavigate();
  const [focuseButton, setFocusedButton] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { colorMode, setColorMode } = useContext(ModeContext);
  const { setQuizeContextData } = useContext(quizeContext);
    const { toggleState, setToggleState } = useContext(ToggleContext);


  // A function that handle all keyDowns in the result page
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      // Runs if toggle switch si already focused
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
    } else if (event.key.toLowerCase() === "l") {
      // Disfocusing the playAgain button
      setFocusedButton(false);

      // Focussing the toggle button if it's not focused
      if (!toggleState) return setToggleState("focuse");
    } else if (event.key === "Tab") {
      event.preventDefault();
      // Disfocussing all focused element
      if (!focuseButton) return setFocusedButton(true);
      if (toggleState) setToggleState("");

      return;
    }
  }

  // useEffect for handling subject/topics that are not currently part of our topics/data
  useEffect(() => {
    // Focusing the hidden Input element on page load or render
    inputRef.current?.focus();
  });

  return (
    <FallBackContainer>
      <p className="error">404</p>
      <h1 className="title">page not found</h1>
      <span className="empty"></span>
      <p className="message">
        But if you don't change your direction, <br /> and if you keep looking,
        you may end <br /> up where you are heading.
      </p>
      <span className="btnContainer">
        <SubmitButton
          focused={
            focuseButton
              ? "linear-gradient(0deg,rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)),#a729f5"
              : ""
          }
          content="Take me home"
        />
      </span>
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
    </FallBackContainer>
  );
}

export default FallBackUI
