import styled from "styled-components";
import { Wrapper } from "../Subject";
import { ButtonsWrapper } from "../../hero/Hero";
import { AppTitle } from "../../hero/Hero";

const ResultsCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.lightMode.button};
  box-shadow: 0px 16px 40px rgba(143, 160, 193, 0.14);
  display: flex;
  flex-direction: column;
  justify-content:space-between;
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
      color: ${({theme})=>theme.lightMode.text};
      font-weight: 500;
      font-size: 1.125rem;
    }
  }

  p {
    font-family: "Rubik Variable", "Rubik", sans-serif;
    font-size: 5.5rem;
    font-weight: 500;
    padding: 0;
    margin:0;
  }
`;

function Result() {
  return (
    <Wrapper>
      <AppTitle>
        <h1>
          Quiz completed <br></br><span>You scored...</span>
        </h1>
      </AppTitle>

      <ButtonsWrapper>
        <ResultsCard>
            <div className="subject">
            <span><img src="/images/icon-accessibility.svg" alt="" /></span>
            <h4>Aceesibility</h4>
          </div>

          <p>8</p>
          <span>out of 10</span>
        </ResultsCard>
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Result
