import styled from "styled-components"
import MenuButton from "../../components/menuButton/MenuButton ";

const Wrapper = styled.div`
  /* Mobile */
  width: 100%;
  margin: 0;
  gap: 2rem;
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    margin-top: 4rem;
    gap: 3rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    flex-direction: row;
  }
`;

export const ButtonsWrapper = styled.div`
  /* Mobile */
  width: 100%;
  gap: 1rem;
  display: flex;
  padding: 0;
  justify-content: space-between;
  flex-direction: column;

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    gap: 2rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    flex-basis: 0;
    flex-grow: 1;
    gap:1.5rem;
  }
`;




export const AppTitle = styled.div`
  /* Mobile */
  h1 {
    font-size: 2.5rem;
    margin: 0;
    padding-top: 0;
    font-family: "Rubik Variable","Rubik", sans-serif;
    font-weight: 300;

    span {
      font-weight: 500;
    }
  }

  p {
    margin-top: 1rem;
    font-family: "Rubik Italic", "Rubik", sans-serif;
    color: ${({ theme }) => theme.lightMode.miniText};
    font-size: 0.875rem;
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    h1 {
      font-size: 3.5rem;
    }

    p{
      font-size: 1rem;
    }
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    flex-basis: 0;
    flex-grow: 1;

    h1 {
      font-size: 4rem;
    }

    p {
      margin-top: 4rem;
    }
  }
`;


function Hero() {
  return (
    <Wrapper>
      <AppTitle>
        <h1>
          Welcom to the <br /> <span>Frontend Quiz!</span>{" "}
        </h1>
        <p>Pick a subject to get started.</p>
      </AppTitle>
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
        <MenuButton
          icon={"/images/icon-js.svg"}
          background={"#EBF0FF"}
          subject={"Javascript"}
        />
        <MenuButton
          icon={"/images/icon-accessibility.svg"}
          background={"#F6E7FF"}
          subject={"Accessibility"}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default Hero










