import styled from "styled-components"
import data from "../../DATA/data.json"; 
import MenuButton from "../../components/menuButton/MenuButton ";
import { ButtonsWrapper, TitleWrapper } from "../../components/layout/SharedLayouts";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [focusedElement, setFocusedElement] = useState<number>(0)
  const navigate = useNavigate();
  const divref = useRef<(HTMLDivElement | null)>(null);;

  function handleKeyDown(event: React.KeyboardEvent, focusableElements: number) {
    console.log("lisetning to keydown");
    
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      setFocusedElement(
        (prevIndex) => (prevIndex + 1) % focusableElements
      );
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      setFocusedElement(
        (prevIndex) =>
          (prevIndex - 1 + focusableElements) % focusableElements
      );
    } else if (event.key === "Enter") {
      navigate(`/${data.quizzes[focusedElement].title}`);
    }
  }

  useEffect(() => {
    divref.current?.focus();
  },[])

  return (
    <Wrapper onKeyDown={(event)=>handleKeyDown(event,data.quizzes.length)} ref={divref} tabIndex={0}>
      <TitleWrapper onKeyDown={(event)=>handleKeyDown(event,data.quizzes.length)}>
        <div>
          <h1>
            Welcome to the
            <br /> <span>Frontend Quiz!</span>
          </h1>
          <p>Pick a subject to get started.</p>
        </div>
      </TitleWrapper>

      <ButtonsWrapper>
        {
          // displayed topics/subject from data
          data.quizzes.map((item, index) => {
            return (
              <MenuButton
                focused={focusedElement === index? "focused" : ""}
                key={index}
                icon={item.icon}
                background={`${item.title}`}
                subject={item.title}
              />
            );
          })
        }
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Hero
