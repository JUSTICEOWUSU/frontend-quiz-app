import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Button = styled.button<{ background: string }>`
  /* Mobile */

  width: 100%;
  height: 4rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  border: none;
  gap: 1.875rem;
  flex-grow: 0;
  border-radius: 1.25rem;
  color: ${({ theme }) => (theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text)};
  background-color: ${({ theme }) => ( theme.mode == "dark" ? theme.darkMode.button : theme.lightMode.button)};
  box-shadow: ${({ theme }) =>
  (theme.mode == "dark"
      ? "0px 16px 40px rgba(49, 62, 81, 0.14)"
      : "0 1rem 2.5rem rgba(143, 160, 193, 0.14)")};
  span {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.3125rem;
    background: ${({ background }) => background};
    border-radius: 0.5rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    font-family: "Rubik Variable", "Rubik", sans-serif;
    font-weight: 500;
    font-size: 1rem;
  }

  &:hover{
    cursor:pointer;
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


function MenuButton({ icon, background, subject }: { icon: string; background: string; subject: string; }) {
  const naviagate = useNavigate()

  const respondToClick = () => {
   return naviagate(`/${subject}`)
 }
  return (
    <Button background = {background} onClick={respondToClick}>
      <span>
        <img
          src={icon}
          alt=""
        />
     </span>
      <p>{ subject }</p>
    </Button>
  );
}

export default MenuButton 




