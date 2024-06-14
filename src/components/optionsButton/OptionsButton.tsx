import styled from 'styled-components';

const Button = styled.span`
  .focused {
    border: 0.1875rem solid ${({ theme }) => theme.primaryBlue};

    .optionCharacter {
      background: ${({ theme }) => theme.primaryBlue};

      p {
        color: ${({ theme }) => theme.darkMode.text};
      }
    }
  }

  button {
    width: 100%;
    flex-grow: 0;
    border: none;
    outline: none;
    display: flex;
    gap: 0.6875rem;
    padding: 0.7rem;
    align-items: center;
    border-radius: 1.25rem;
    transition: all 0.5s linear;
    transition-property: background-color;

    color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};
    background-color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button};
    box-shadow: ${({ theme }) =>
      theme.mode == "dark"
        ? "0px 16px 40px rgba(49, 62, 81, 0.14)"
        : "0 1rem 2.5rem rgba(143, 160, 193, 0.14)"};

    /*Option text  */
    .content {
      margin: 0;
      padding: 0;
      flex-grow: 8;
      text-align: left;
      font-weight: 500;
      font-size: 1.125rem;
      font-family: ${({ theme }) => theme.fontFamily};
    }

    /*Option character (A, B, C, D) container  */
    span {
      flex-grow: 0;
      display: flex;
      width: 2.5rem;
      flex-shrink: 0;
      height: 2.5rem;
      padding: 0.3125rem;
      align-items: center;
      border-radius: 0.5rem;
      background: ${({ theme }) => theme.lightMode.background};

      p {
        margin: auto;
        font-weight: 500;
        font-size: 1.125rem;
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
      background: transparent;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .showIcon {
      display: block;
    }

    &:hover {
      span {
        background: ${({ theme }) => theme.lightMode.background};

        p {
          color: ${({ theme }) => theme.primaryBlue};
        }
      }

      .icon{
        background:transparent;
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

      .content {
        font-size: 1.75rem;
      }
    }

    /* Desktop (1050px->) */
    @media (min-width: 1050px) {
      padding: 0 1rem;
      min-height: 4.5rem;

      span {
        width: 2.8rem;
        flex-shrink: 0;
        height: 2.8rem;

        p {
          font-size: 1.5rem;
        }
      }
    }
  }

  /* custom class that controls the border color of the button(either red or green) */
  .correct {
    border: 3px solid #26d782;

    .optionCharacter {
      background-color: #26d782;
    }
  }

  .wrong {
    border: 3px solid #ee5454;

    .optionCharacter {
      background-color: #ee5454;
    }
  }
`;

interface OptionButtonPropsTypes {
  option: string;
  content: string;
  focused: string;
  disabled: boolean;
  answerState: { answer: string; icon: string };
  refItem?: React.LegacyRef<HTMLButtonElement>;
}

function OptionsButton( { option, content, answerState, disabled, refItem, focused }: OptionButtonPropsTypes ) {

  return (
    <Button>
      <button
        disabled={disabled}
        ref={refItem}
        className={`${answerState.answer} ${focused}`}
      >
        {/* Option character (A, B, C, D) */}
        <span className="optionCharacter">
          <p>{option}</p>
        </span>

        {/* Option Content/Message/Text */}
        <p className="content">{content}</p>

        {/* Icon that portrays either correct or incorrect answer was chosen after submitting answer */}
        <span className={`icon ${answerState.icon}`}>
          <img
            src={`${
              answerState.answer == "correction" ||
              answerState.answer == "correct"
                ? "/assets/images/icon-correct.svg"
                : "/assets/images/icon-incorrect.svg"
            }`}
            srcSet={`${
              answerState.answer == "correction" ||
              answerState.answer == "correct"
                ? "/assets/images/icon-correct.svg"
                : "/assets/images/icon-incorrect.svg"
              }`}
            loading='lazy'
            alt={`${
              answerState.answer == "correction" ||
              answerState.answer == "correct"
                ? "correct"
                : "incorrect"
            }`}
          />
        </span>
      </button>
    </Button>
  );
}

export default OptionsButton
