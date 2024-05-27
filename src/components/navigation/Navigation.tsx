import styled from "styled-components";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { ModeContext } from "../../App";

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
  padding: 1rem 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .imageContainer {
    width: 1rem;
    height: 1rem;
    display: block;

    img {
      width: 100%;
      height: 100%;
    }
  }


  /* Tablet (1025px ->) */
  @media (min-width: 640px) {
    margin-right: 24px;
    width: 8rem;

    .imageContainer {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;


function Navigation() {
  const { colorMode } = useContext(ModeContext)
  
  return (
    <ModeBar>
      <div></div>
      <ToggleWrapper>
        <span className="imageContainer">
          <img
            src={`${
              colorMode == "dark"
                ? "images/icon-sun-light.svg"
                : "images/icon-sun-dark.svg"
            }`}
          />
        </span>

        <ToggleSwitch />

        <span className="imageContainer">
          <img
            src={`${
              colorMode == "dark"
                ? "images/icon-moon-light.svg"
                : "images/icon-moon-dark.svg"
            }`}
          />
        </span>
      </ToggleWrapper>
    </ModeBar>
  );
}

export default Navigation
