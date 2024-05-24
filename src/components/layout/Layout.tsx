import styled from "styled-components"
import Navigation from "../navigation/Navigation";
import { Outlet, useParams } from "react-router-dom";
import { createContext,useState } from "react";

const Wrapper = styled.div <{subject?:string}>`
  /* Mobile */
  margin: 0;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  padding: 1.5rem;
  color: ${({ theme }) => theme.lightMode.text};
  background-color: ${({ theme }) => theme.lightMode.background};
  background-image: url("/images/pattern-background-mobile-light.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    width: 100%;
    padding: 2.5rem 4rem 1rem 4rem;
    background-image: url("/images/pattern-background-tablet-light.svg");
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    padding: ${({subject})=>subject? "3.5rem 8.75rem 0 8.75rem":"3.5rem 7.1875rem 0 10.3125rem"};
    background-image: url("/images/pattern-background-desktop-light.svg");
  }
`;



function Layout() {
  const { subject } = useParams();

  const [colorMode, setColoMoede] = useState("")
  const LightDarkModeContext = createContext(colorMode);


  return (
    <LightDarkModeContext.Provider value={colorMode}>
      <Wrapper subject={subject}>
        <Navigation />
        <Outlet />
      </Wrapper>
    </LightDarkModeContext.Provider >
  );
}

export default Layout
