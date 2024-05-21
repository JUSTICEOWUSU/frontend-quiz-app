import styled from "styled-components"
import Navigation from "../navigation/Navigation";
import Hero from "../../pages/hero/Hero";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
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
    padding: 3rem;
    background-image: url("/images/pattern-background-tablet-light.svg");
  }


  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    padding: 4rem 6rem;
    background-image: url("/images/pattern-background-desktop-light.svg");
  }
`;



function Layout() {
  return (
      <Wrapper>
          <Navigation/>
          <Outlet/>
    </Wrapper>
  );
}

export default Layout
