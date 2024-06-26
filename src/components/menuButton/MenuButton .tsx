import styled from 'styled-components'

const Button = styled.span<{ $background: string }>`
  button {
    /* Mobile */
    width: 100%;
    height: 4rem;
    border: none;
    flex-grow: 0;
    outline: none;
    gap: 1.875rem;
    display: flex;
    padding: 1.25rem;
    align-items: center;
    border-radius: 1.25rem;
    transition: background-color 0.5s linear;

    color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};
    background-color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button};
    box-shadow: ${({ theme }) =>
      theme.mode == "dark"
        ? "0px 16px 40px rgba(49, 62, 81, 0.14)"
        : "0 1rem 2.5rem rgba(143, 160, 193, 0.14)"};

    span {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.3125rem;
      border-radius: 0.5rem;
      background: ${({ $background }) =>
        $background == "HTML"
          ? "#FFF1E9"
          : $background == "CSS"
          ? "#E0FDEF"
          : $background == "JavaScript"
          ? "#EBF0FF"
          : "#F6E7FF"};

      /*  */
      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      font-size: 1rem;
      font-weight: 500;
      font-family: ${({ theme }) => theme.fontFamily};
      color: ${({ theme }) =>
        theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};
    }

    &:hover {
      cursor: pointer;
    }

    /* Tablets (640px->) */
    @media (min-width: 640px) {
      height: 5rem;

      span {
        width: 2.8125rem;
        height: 2.8125rem;
      }

      p {
        font-size: 1.5rem;
      }
    }
  }

  .focused {
    border: 0.125rem solid ${({ theme }) => theme.primaryBlue};

    @media (min-width: 640px) {
      border-width:0.1875rem;
    }
  }
  outline: none;
`;

interface MenuButtonTypes {
  icon: string;
  subject: string;
  background: string;
  focused: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}


function MenuButton({ icon, background, subject, focused, onClick }: MenuButtonTypes) {
  // Menu button onclick event listerner(navigate to the subject page)
  
  return (
    <Button $background={background}>
      <button className={`${focused}`} onClick={onClick}>
        <span>
          <img loading="lazy" srcSet={icon} src={icon} alt={`${subject}`} />
        </span>

        {/* subject/content(HTML, CSS,etc.) */}
        <p>{subject}</p>
      </button>
    </Button>
  );
}

export default MenuButton 
