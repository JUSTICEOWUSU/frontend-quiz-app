import styled from "styled-components"
import ToggleSwitch from "../toggleSwitch/ToggleSwitch"

const ModeBar = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: space-between;

  /* Tablet */
  @media (min-width: 640px) {
    margin-bottom: 3.0625rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1052px) {
    margin-right: 24px;
    margin-bottom: 4.5rem;
  }
`;

const ToggleWrapper = styled.div`
  /* Mobile */
  width: 80px;
  margin: 0;
  padding:1rem 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center; 

  img {
    width: 100%;
    height: 100%;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1052px) {
    margin-right: 24px;
  }
`;


const Span = styled.span`
    width:16px;
    height:16px;
    display:block;
`

function Navigation() {
  return (
    <ModeBar>
      <div></div>
      <ToggleWrapper>
        <Span>
          <img src="images/icon-sun-dark.svg" />
        </Span>
              
        <ToggleSwitch/>

        <Span>
          <img src="images/icon-moon-dark.svg" />
        </Span>
      </ToggleWrapper>
    </ModeBar>
  );
}

export default Navigation
