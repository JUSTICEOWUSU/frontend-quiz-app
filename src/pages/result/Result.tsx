import styled from "styled-components";
import { useContext, useEffect } from "react";
import { currentSubjectData } from "../pageUtils";
import { resultContext } from "../../context/contexts";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../components/submitButton/SubmitButton";

// Importing layouts from the SharedLayout compenent
import {
  ButtonsWrapper,
  TitleWrapper,
  ContentWrapper,
} from "../../components/layout/SharedLayouts";

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
      display: block;
      height: 2.5rem;
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
  const navigate = useNavigate();
  const { subject } = useParams();

  const { resultData, setResultData } = useContext(resultContext);

  function handleButtonClick() {
    setResultData({ numberOfPasssedQuestions: 0, numberOfQuetsions: 0 });
    return navigate("/");
  }

  // useEffect for handling subject/topics that are not currently part of our topics/data
  useEffect(() => {
    const subjectData = currentSubjectData(subject);
    if (!subjectData || subjectData.length === 0) {
      navigate("/Error");
    }
  });

  return (
    <ContentWrapper>
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
              <img src={`/images/icon-${subject?.toLowerCase()}.svg`} alt="" />
            </span>
            <h4>{subject}</h4>
          </div>

          <p className="score">{resultData.numberOfPasssedQuestions}</p>

          <span>out of {resultData.numberOfQuetsions}</span>
        </ResultsCard>
        <SubmitButton onClick={handleButtonClick} content="play again" />
      </ButtonsWrapper>
    </ContentWrapper>
  );
}

export default Result;
