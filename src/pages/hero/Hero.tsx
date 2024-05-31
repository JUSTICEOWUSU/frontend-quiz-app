import styled from "styled-components"
import data from "../../../public/data.json"; 
import MenuButton from "../../components/menuButton/MenuButton ";
import { ButtonsWrapper, TitleWrapper } from "../../components/layout/SharedLayouts"; 

const Wrapper = styled.div`
  /* Mobile */
  margin: 0;
  gap: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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

  return (
    <Wrapper>
      <TitleWrapper>
        <h1>
          Welcome to the
          <br /> <span>Frontend Quiz!</span>
        </h1>
        <p>Pick a subject to get started.</p>
      </TitleWrapper>

      <ButtonsWrapper>
        {
          // displayed topics/subject from data
          data.quizzes.map((item, index) => {
            return (
              <MenuButton
                key={index}
                icon={item.icon}
                background={`${
                  item.title == "HTML"
                    ? "#FFF1E9"
                    : item.title == "CSS"
                    ? "#E0FDEF"
                    : item.title == "JavaScript"
                    ? "#EBF0FF"
                    : "#F6E7FF"
                }`}
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
