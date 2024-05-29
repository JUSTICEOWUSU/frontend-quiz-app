import styled from "styled-components";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { useNavigate } from "react-router-dom";

// Importing layouts from the SharedLayout compenent
import { ButtonsWrapper, TitleWrapper, ContentWrapper } from "../../components/layout/SharedLayouts";

const ResultsCard = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem;
  height: 15.125rem;
  align-items: center;
  border-radius: 0.75rem;
  flex-direction: column;
  justify-content: space-between;
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
      display: block;
      height: 2.5rem;
      background: #f6e7ff;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      font-weight: 500;
      font-size: 1.125rem;
      font-family: "Rubik Variable", "Rubik", sans-serif;
    }
  }

  .score {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 5.5rem;
    font-family: "Rubik Variable", "Rubik", sans-serif;
  }

  span {
    font-weight: 400;
    font-size: 1.125rem;
    font-family: "Rubik Variable", "Rubik", sans-serif;
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
  const navigate = useNavigate()

  function respondToButtonClick() {
    return navigate("/")
  }

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
              <SubmitButton onClick={respondToButtonClick} content="play again"/>
      </ButtonsWrapper>
    </ContentWrapper>
  );
}

export default Result
