import styled from 'styled-components'

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + span:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
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
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  } 
`;


function ToggleSwitch() {
  return (
      <Label>
          <input type="checkbox"></input>
          <Span/>
      </Label>
  )
}

export default ToggleSwitch
