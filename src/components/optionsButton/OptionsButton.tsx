import styled from 'styled-components';


const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  display: flex;
  align-items: center;
  border: none;
  gap: 0.6875rem;
  flex-grow: 0;
  border-radius: 1.25rem;
  color: ${({ theme }) =>
    theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};

  background-color: ${({ theme }) =>
    theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button};

  box-shadow: ${({ theme }) =>
    theme.mode == "dark"
      ? "0px 16px 40px rgba(49, 62, 81, 0.14)"
      : "0 1rem 2.5rem rgba(143, 160, 193, 0.14)"};

  .answer {
    font-family: "Rubik Variable ", "Rubik", sans-serif;
    font-weight: 500;
    padding: 0;
    margin: 0;
    /* color: ${({ theme }) => theme.lightMode.text}; */
    font-size: 1.125rem;
    text-align: left;
    text-transform: capitalize;
  }

  span {
    width: 2.5rem;
    height: 2.5rem;
    display: block;
    padding: 0.3125rem;
    background: ${({ theme }) => theme.lightMode.background};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;

    p {
      font-size: 1.125rem;
      font-weight: 500;
      margin: auto;
      text-transform: uppercase;
      color: ${({ theme }) => theme.lightMode.text};
      font-family: "Rubik Variable", "Rubik", sans-serif;
    }
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    span {
      width: 3.5rem;
      height: 3.5rem;

      p {
        font-size: 1.75rem;
      }
    }

    .answer {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 1050px) {
    padding: 0 1rem;
    min-height: 4.5rem;

    span {
      width: 2.8rem;
      height: 2.8rem;

      p {
        font-size: 1.5rem;
      }
    }
  }

  &:hover {
    span {
      background: ${({ theme }) => theme.lightMode.background};

      p {
        color: ${({ theme }) => theme.primaryBlue};
      }
    }
  }

  &:active {
    border: 0.1875rem solid ${({ theme }) => theme.primaryBlue};

    span {
      background: ${({ theme }) => theme.primaryBlue};

      p {
        color: ${({ theme }) => theme.darkMode.text};
      }
    }
  }
`;

function OptionsButton({ option, answer }: { option: string; answer: string; }) {
  return (
    <Button>
          <span>
             <p>{option}</p> 
         </span>
      <p className='answer'>{answer}</p>
    </Button>
  );
}

export default OptionsButton
