import styled from "styled-components";

import React from 'react'

const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .ldsRipple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .ldsRipple div {
    position: absolute;
    border: 4px solid ${({theme})=>theme.primaryBlue};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .ldsRipple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

function LoadingSpinner() {
  return (
      <Div>
        <div className={"ldsRipple"}>
          <div></div>
          <div></div>
        </div>
      </Div>
  );
}

export default LoadingSpinner
