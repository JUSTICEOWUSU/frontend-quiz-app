import styled from 'styled-components';

const Button = styled.span`
  button {
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

    .content {
      font-family: "Rubik Variable ", "Rubik", sans-serif;
      font-weight: 500;
      padding: 0;
      margin: 0;
      font-size: 1.125rem;
      text-align: left;
      text-transform: capitalize;
      flex-grow: 8;
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
      flex-grow: 1;

      p {
        font-size: 1.125rem;
        font-weight: 500;
        margin: auto;
        text-transform: uppercase;
        color: ${({ theme }) => theme.lightMode.text};
        font-family: "Rubik Variable", "Rubik", sans-serif;
      }
    }

    .icon {
      width: 40px;
      height: 40px;
      flex-grow: 0;
      display: none;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .showIcon {
      display: block;
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

      .content {
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
  }

  .correct {
    border: 1px solid green;
    background:yelllow;
  }

  .wrong {
    border: 1px solid red;
  }
`;

function OptionsButton({ option, content, onClick, answerState, disabled }: {  disabled: boolean; option: string; content: string; answerState: { answer: string;   icon:string}; onClick?:React.MouseEventHandler<HTMLButtonElement> }) {
  

  return (
    <Button>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${answerState.answer}`}
      >
        <span className="optionCharacter">
          <p>{option}</p>
        </span>
        <p className="content">{content}</p>

        <span className={`icon ${answerState.icon}`}>
          <img
            src={`${
              answerState.answer == "correction" || answerState.answer == "correct"
                ? "images/icon-correct.svg"
                : "images/icon-incorrect.svg"
            }`}
            alt=""
          />
        </span>
      </button>
    </Button>
  );
}

export default OptionsButton
