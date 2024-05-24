import styled from "styled-components"
import OptionsButton from "../../components/optionsButton/OptionsButton";
import { ButtonsWrapper, ContentWrapper } from "../../components/layout/SharedLayouts"; 
import SubmitButton from "../../components/submitButton/SubmitButton";


const QuestionWrapper = styled.div`
  padding:0;
  /* width:462px; */
  .question-number {
    font-size: 0.875rem;
    margin-top: 0;
    color: ${({ theme }) => theme.lightMode.miniText};
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
  background-color: ${({ theme }) => theme.lightMode.button};
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
        margin-top:7.6875rem;
    }

`;

function Subject() {
  return (
    <ContentWrapper>
      <QuestionWrapper>
        <p className="question-number">5 0ut of 10</p>
        <span className="question">
          "Which of the following is the correct structure for an HTML document?
        </span>
        <ProgressBar>
          <span></span>
        </ProgressBar>
      </QuestionWrapper>

      <ButtonsWrapper>
        <OptionsButton option={"A"} answer={"Hyper Text Markup Language"} />
        <OptionsButton option={"A"} answer={"Hyper Text Markup Language"} />
        <OptionsButton option={"A"} answer={"Hyper Text Markup Language"} />
        <OptionsButton option={"A"} answer={"Hyper Text Markup Language"} />
        <SubmitButton />
      </ButtonsWrapper>
    </ContentWrapper>
  );
}

export default Subject








