import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../submitButton/SubmitButton'


const FallBackContainer = styled.div`
  width: 100%;
  margin: auto;

  .message {
    width: auto;
    margin: auto;
    margin-top:5rem;
    font-size: 1rem;
    font-weight: lighter;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};
  }

  .sorry{
    font-size: 1.5rem;
  }

  .btnContainer {
    width: 100%;
    display: block;
    margin-top: 2rem;
  }

  @media (min-width: 640px) {
    .message {
      margin-top:unset;
      font-size: 1.5rem;
    }

    .sorry {
      font-size: 2rem;
    }
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    .btnContainer {
      width: 30rem;
    }
  }
`;

function FallBackUI() {
    const navigate = useNavigate()
    
  return (
      <FallBackContainer>
          <p className='message'><span className='sorry'>sorry,</span><br /> we currently do not have your requested subject. we are doing our best to add more topics.<br />please feel free to explore our available subjects here</p>
          <span className='btnContainer'><SubmitButton content='here' onClick={()=>navigate("/")}/></span>
    </FallBackContainer>
  )
}

export default FallBackUI
