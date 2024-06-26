import styled from "styled-components"
import { ModeContext } from "../../App";
import data from "../../DATA/data.json"; 
import { useNavigate } from "react-router-dom";
import { handleMobileKeyDown } from "../../appUtils/pagesUtils/pageUtils";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import InvisibleInput from "../../components/invisibleInput/InvisibleInput";
import { ToggleContext } from "../../AppContext/toggleContext/toggleContext";
import { useEffect, useRef, useState, useContext, lazy, Suspense } from "react";
const MenuButton = lazy(() => import("../../components/menuButton/MenuButton "));
import { ButtonsWrapper, TitleWrapper } from "../layouts/SharedLayouts";


const Wrapper = styled.div`
  /* Mobile */
  margin: 0;
  gap: 2rem;
  width: 100%;
  display: flex;
  outline: none;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fontFamily};


  /* Tablets (640px->) */
  @media (min-width: 640px) {
    height: 39.875rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    gap: 3rem;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
  }
`;

function Hero() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { colorMode, setColorMode } = useContext(ModeContext);
  const { toggleState, setToggleState } = useContext(ToggleContext);
  const [focusedElement, setFocusedElement] = useState<number>(-1);

  // Determining if user is on mobile device or not
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Function that handle keyboard events on the hero page
  function handleKeyDown(
    event: React.KeyboardEvent,
    focusableElements: number
  ) {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowRight" ||
      event.key === "Tab" ||
      event.key.toLowerCase() === "u"
    ) {
      event.preventDefault();
      // Defocusing the toggle switch
      if (toggleState) setToggleState("");

      // Checking if no menu item is selected or focused
      if (focusedElement > focusableElements || focusedElement < 0)
        return setFocusedElement(0);
      // Setting focus to the next item
      setFocusedElement((prevIndex) => (prevIndex + 1) % focusableElements);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      // Defocusing the toggle switch
      if (toggleState) setToggleState("");

      // Setting focus to the previuos item
      setFocusedElement(
        (prevIndex) => (prevIndex - 1 + focusableElements) % focusableElements
      );
    } else if (event.key === "Enter" || event.key === " ") {
      // Runs if a topic/subject is selected
      if (focusedElement < focusableElements && focusedElement >= 0) {
        // Navigating to the subject page
        return navigate(`/${data.quizzes[focusedElement].title}`);
      }

      // Runs if toggle switch is already focused
      if (toggleState) {
        window.localStorage.setItem(
          "mode",
          `${colorMode == "light" ? "dark" : "light"}`
        );
        return setColorMode(colorMode == "light" ? "dark" : "light");
      }

      return;
    } else if (event.key.toLowerCase() === "l") {

      // Defocusing any selected topic/subject
      setFocusedElement(focusableElements + 1);

      // Focussing the toggle button if it's not focused
      if (!toggleState) return setToggleState("focuse");
    }

    return;
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const value = input.value;
    const key = value.slice(-1); // Get the last character entered
    if (!isMobile) return (input.value = ""); // return if on desktop device

    if (key) {
      // Simulating the keyDown event on mobile device
      const simulatedEvent = new KeyboardEvent("keydown", { key });
      handleKeyDown(simulatedEvent as any, data.quizzes.length);
    }

    input.value = ""; // Clear the input value to capture each keystroke separately
  };

  // Effect run component first mount
  useEffect(() => {
    if(!isMobile)inputRef.current?.focus();
  });

  return (
    <Wrapper tabIndex={0}>
      {/* Invisible input element for the page navigation */}
      <InvisibleInput
        handleKeyDown={(e) => {
          isMobile
            ? handleMobileKeyDown(e)
            : handleKeyDown(e, data.quizzes.length);
        }}
        handleInput={handleInput}
        inputRef={inputRef}
      />

      <TitleWrapper>
        <div>
          <h1>
            Welcome to the
            <br /> <span>Frontend Quiz!</span>
          </h1>
          <p>Pick a subject to get started.</p>
        </div>
      </TitleWrapper>

      <ButtonsWrapper>
              <Suspense fallback={<LoadingSpinner/>}>

        {
          // displayed topics/subjects from data
          data.quizzes.map((item, index) => {
            return (
              <MenuButton
                focused={focusedElement === index ? "focused" : ""}
                key={index}
                icon={item.icon}
                background={`${item.title}`}
                subject={item.title}
                onClick={()=>{return navigate(`/${item.title}`);}}
              />
            );
          })
          }
          </Suspense>
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Hero
