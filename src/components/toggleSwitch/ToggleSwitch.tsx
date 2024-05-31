import styled from 'styled-components'
import { useContext } from 'react';
import { ModeContext } from '../../App';

const Label = styled.label`
  position: relative;
  display: block;
  width: 2rem;
  height: 1.25rem;

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
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.primaryBlue};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

    @media (min-width: 640px) {
      &:before{
        width:1.25rem;
        height:1.25rem;
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
