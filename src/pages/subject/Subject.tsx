import styled from "styled-components"

import { Wrapper } from "../hero/Hero"
import { ButtonsWrapper } from "../hero/Hero"
import MenuButton from "../../components/menuButton/MenuButton ";

const QuestionWrapper = styled.div`
  .question-number {
    font-size: 1rem;
    color: ${({ theme }) => theme.lightMode.miniText};
    font-family: "Rubik Variable Italic", "Rubik Italic", sans-serif;
  }

  .question {
    font-family: "Rubik Variable ", "Rubik", sans-serif;
    font-family: 1.5rem;
    font-size: 1.25rem;
    display:block;
    margin:2rem 0;
  }

`;

const ProgressBar = styled.span`
    display:block;
    width: 100%;
    height: 0.6rem;
    padding: 0.25rem;
    background-color: ${({theme})=>theme.lightMode.button};
    border-radius: 62rem;

    span{
        display:block;
        width: 60%;
        height: 100%;
        border-radius:6.5rem;
        background-color:${({theme})=>theme.primaryBlue};
    }

`


function Subject() {
  return (
    <Wrapper>
      <QuestionWrapper>
        <p className="question-number">5 0ut of 10</p>
        <span className="question">
          "Which of the following is the correct structure for an HTML document?
        </span>
              <ProgressBar >
                  <span></span>
              </ProgressBar>
      </QuestionWrapper>

      <ButtonsWrapper>
        <MenuButton
          icon={"/images/icon-html.svg"}
          background={"#FFF1E9"}
          subject={"HTML"}
        />
        <MenuButton
          icon={"/images/icon-css.svg"}
          background={"#E0FDEF"}
          subject={"CSS"}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Subject








