import styled from 'styled-components'

const Button = styled.button`
  width: 100%;
  height: 4rem;
  border: none;
  display: flex;
  padding: 0.75rem;
  font-weight: 500;
  align-items: center;
  font-size: 1.125rem;
  border-radius: 1.25rem;
  justify-content: center;
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme }) => theme.primaryBlue};
  box-shadow: 0 1rem 2.5rem rgba(143, 160, 193, 0.14);
  color: ${({ theme }) => theme.lightMode.button};

  &:hover {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      #a729f5;
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    height: 5rem;
    font-size: 1.75rem;
    border-radius: 1.5rem;
  }

  @media (min-width: 1050px) {
    height: 4rem;
  }
`;

interface SubmitButtonTypes {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content: string;
}

function SubmitButton({onClick,content}:SubmitButtonTypes) {
  return (
    <Button onClick={onClick}>{content}</Button>
  )
}

export default SubmitButton
