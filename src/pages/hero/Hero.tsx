import styled from "styled-components"
import MenuButton from "../../components/menuButton/MenuButton ";
import { ButtonsWrapper, TitleWrapper } from "../../components/layout/SharedLayouts"; 
import data from '../../../public/data.json' 

const Wrapper = styled.div`
  /* Mobile */
  width: 100%;
  margin: 0;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 300ms ease-out;

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
  // const {colorMode} = useContext(ModeContext)
  return (
    <Wrapper>
      <TitleWrapper>
        <h1>
          Welcome to the <br /> <span>Frontend Quiz!</span>{" "}
        </h1>
        <p>Pick a subject to get started.</p>
      </TitleWrapper>

            <ButtonsWrapper>

      {
        data.quizzes.map(( item,index ) => {
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
        
        {/* <MenuButton
          icon={"/images/icon-css.svg"}
          background={"#E0FDEF"}
          subject={"CSS"}
        />
        <MenuButton
          icon={"/images/icon-js.svg"}
          background={"#EBF0FF"}
          subject={"Javascript"}
        />
        <MenuButton
          icon={"/images/icon-accessibility.svg"}
          background={"#F6E7FF"}
          subject={"Accessibility"}
        /> */}
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Hero










