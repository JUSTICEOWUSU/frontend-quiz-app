import styled from 'styled-components'
import { useContext } from 'react';
import { ModeContext } from '../../App';

const Label = styled.label`
  width: 2rem;
  display: block;
  height: 1.25rem;
  position: relative;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + span:before {
    -webkit-transform: translateX(12px);
    -ms-transform: translateX(12px);
    transform: translateX(12px);
  }

  /* Tablet (640px) */
  @media (min-width: 640px) {
    width: 3rem;
    height: 1.75rem;

    input:checked + span:before {
      -webkit-transform: translateX(1.25rem);
      -ms-transform: translateX(1.25rem);
      transform: translateX(1.25rem);
    }
  }
`;

const Span = styled.span`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  transition: 0.4s;
  position: absolute;
  border-radius: 34px;
  -webkit-transition: 0.4s;
  background-color: ${({ theme }) => theme.primaryBlue};

  &:before {
    left: 4px;
    bottom: 4px;
    width: 12px;
    content: "";
    height: 12px;
    transition: 0.4s;
    border-radius: 50%;
    position: absolute;
    background-color: #fff;
    -webkit-transition: 0.4s;
  }

  @media (min-width: 640px) {
    &:before {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;


function ToggleSwitch() {
  const { colorMode, setColorMode } = useContext(ModeContext);
  
  function listenToOnchange() {
  window.localStorage.setItem(
    "mode",
    `${colorMode == "light" ? "dark" : "light"}`
  );
  setColorMode(colorMode == "light" ? "dark" : "light")
  }

  return (
      <Label>
          <input type="checkbox" onChange={listenToOnchange} checked={colorMode === "dark"}></input>
          <Span/>
      </Label>
  )
}

export default ToggleSwitch
