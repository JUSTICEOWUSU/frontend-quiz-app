import Navigation from "../navigation/Navigation";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.div<{ subject?: string; }>`
  /* Mobile */

  margin: 0;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  padding: 1.5rem;

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    width: 100%;
    padding: 2.5rem 4rem 1rem 4rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    padding: ${({ subject }) =>
      subject ? "3.5rem 8.75rem 0 8.75rem" : "3.5rem 7.1875rem 0 10.3125rem"};
  }
`;


function Layout() {
  const { subject } = useParams();


  return (
    <Wrapper subject={subject} >
        <Navigation>
        </Navigation>

        <Outlet />
      </Wrapper>
  );
}

export default Layout
