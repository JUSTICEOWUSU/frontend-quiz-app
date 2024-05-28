import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Button = styled.button<{ background: string }>`
  /* Mobile */

  width: 100%;
  height: 4rem;
  border: none;
  flex-grow: 0;
  gap: 1.875rem;
  display: flex;
  padding: 1.25rem;
  align-items: center;
  border-radius: 1.25rem;
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
    background: ${({ background }) => background};

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    font-family: "Rubik Variable", "Rubik", sans-serif;
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
`;

interface MenuButtonTypes {
  icon: string;
  background: string;
  subject: string;
}


function MenuButton({ icon, background, subject }: MenuButtonTypes) {
  const naviagate = useNavigate()

  // Menu button onclick event listerner(navigate to the subject page)
  const respondToMenuButtonClick = () => naviagate(`/${subject}`)
  
  return (
    <Button background = {background} onClick={respondToMenuButtonClick}>
      <span>
        <img
          src={icon}
          alt={`${subject} icon`}
        />
     </span>
      <p>{ subject }</p>
    </Button>
  );
}

export default MenuButton 
