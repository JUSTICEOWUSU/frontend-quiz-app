import React from 'react'
import styled from 'styled-components'


const Button = styled.button`
  width: 100%;
  height: 4rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.primaryBlue};
  box-shadow: 0 1rem 2.5rem rgba(143, 160, 193, 0.14);
  text-transform: capitalize;
  font-family: "Rubik Variable", "Rubik", sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.lightMode.button};
  font-size: 1.125rem;

  /* Tablets (640px->) */
  @media (min-width: 640px) {
   font-size: 1.75rem;
   height: 5.75rem;
   border-radius: 1.5rem;
  }

`;

function SubmitButton() {
  return (
    <Button>submit</Button>
  )
}

export default SubmitButton
