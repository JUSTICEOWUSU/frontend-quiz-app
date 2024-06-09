import styled from 'styled-components'
import { useContext } from 'react';
import { ModeContext } from '../../App';
import { ToggleContext } from '../../AppContext/toggleContext/toggleContext';

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

  .focuse{
    background: linear-gradient(0deg,rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)),#a729f5;
    border-color:#A729F5
  }

  input:checked + span:before {
    -webkit-transform: translateX(11px);
    -ms-transform: translateX(11px);
    transform: translateX(11px);
  }

  /* Tablet (640px) */
  @media (min-width: 640px) {
    width: 3rem;
    height: 1.75rem;

    input:checked + span:before {
      -webkit-transform: translateX(1.15rem);
      -ms-transform: translateX(1.15rem);
      transform: translateX(1.15rem);
    }
  }
`;

const Span = styled.span`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display:block;
  cursor: pointer;
  transition: 0.4s;
  position: absolute;
  border-radius: 34px;
  border:3px solid transparent;
  -webkit-transition: 0.4s;
  background-color: ${({ theme }) => theme.primaryBlue};

  &:before {
    left: 2px;
    bottom: 1px;
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
  // A context for managing the state of the app colorMode (Dark/Light)
  const { colorMode } = useContext(ModeContext);
  const { toggleState} = useContext(ToggleContext);

  function listenToMouseDown(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
    event.stopPropagation();
    return event.preventDefault();
  }
  

  return (
    <Label onClick={listenToMouseDown}>
      <input type="checkbox" checked={colorMode === "dark"}></input>
      <Span
        className={`${toggleState}`}
      />
    </Label>
  );
}

export default ToggleSwitch
