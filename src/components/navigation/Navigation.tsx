import styled from "styled-components"
import ToggleSwitch from "../toggleSwitch/ToggleSwitch"

const ModeBar = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleWrapper = styled.div`
  /* Mobile */
  width: 80px;
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
