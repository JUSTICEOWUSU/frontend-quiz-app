import styled from 'styled-components'

const Button = styled.button<{background:string}>`
  /* Mobile */

  width: 100%;
  height: 4.5rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  border: none;
  gap: 1.875rem;
  flex-grow: 0;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.lightMode.button};
  box-shadow: 0 1rem 2.5rem rgba(143, 160, 193, 0.14);

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
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    height: 5.5rem;

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
  return (
    <Button background = {background}>
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




