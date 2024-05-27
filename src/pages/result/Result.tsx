import styled from "styled-components";
import { ButtonsWrapper, TitleWrapper, ContentWrapper } from "../../components/layout/SharedLayouts";
import SubmitButton from "../../components/submitButton/SubmitButton";

const ResultsCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) =>
    (theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button)};
  box-shadow: ${({ theme }) =>
    (theme.mode == "dark"
      ? "0px 16px 40px rgba(49, 62, 81, 0.14)"
      : "0 1rem 2.5rem rgba(143, 160, 193, 0.14)")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 0.75rem;
  height: 15.125rem;

  .subject {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0;
    margin: 0;

    span {
      width: 2.5rem;
      height: 2.5rem;
      display: block;
      background: #f6e7ff;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      font-family: "Rubik Variable", "Rubik", sans-serif;
      font-weight: 500;
      font-size: 1.125rem;
    }
  }

  .score {
    font-family: "Rubik Variable", "Rubik", sans-serif;
    font-size: 5.5rem;
    font-weight: 500;
    padding: 0;
    margin: 0;
  }

  span {
    font-size: 1.125rem;
    font-family: "Rubik Variable", "Rubik", sans-serif;
    font-weight: 400;
    color: ${({ theme }) =>
      (theme.mode == "dark" ? theme.darkMode.miniText : theme.lightMode.miniText)};
  }

  @media (min-width: 640px) {
    height: 24.25rem;
    padding: 3rem;
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
  return (
    <ContentWrapper>
      <TitleWrapper>
        <h1>
          Quiz completed <br></br><span>You scored...</span>
        </h1>
      </TitleWrapper>

      <ButtonsWrapper>
        <ResultsCard>
            <div className="subject">
            <span><img src="/images/icon-accessibility.svg" alt="" /></span>
            <h4>Aceesibility</h4>
          </div>

         <p className="score">8</p>

          <span>out of 10</span>
              </ResultsCard>
              <SubmitButton/>
      </ButtonsWrapper>
    </ContentWrapper>
  );
}

export default Result