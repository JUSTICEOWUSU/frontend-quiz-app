import styled from "styled-components";

// THESE ARE LAYOUTS THAT HAS BEEN USED IN MORE THAN ONE COMPONENT OR PAGE

// Buttons container or wrapper for the buttons in the Hero and Subjects page
export const ButtonsWrapper = styled.div`
  /* Mobile */
  gap: 1rem;
  padding: 0;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  outline:none;
  
  .hideSelectAnswer {
    visibility:hidden;
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    gap: 2rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    flex-basis: 0;
    flex-grow: 1;
  }
`;


// Title container or wrapper for the title or headings in the Hero and Result page;
export const TitleWrapper = styled.div`
  /* Mobile */
  h1 {
    margin: 0;
    padding-top: 0;
    font-size: 2.5rem;
    font-weight:300;
    
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) =>
      theme.mode == "dark"
        ? theme.darkMode.text
        : theme.lightMode.text};

    span {
      display: block;
      font-family: ${({ theme }) => theme.fontFamily};
      font-weight: 500;
    }
  }

  p {
    margin-top: 1rem;
    font-size: 0.875rem;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) =>
      theme.mode == "dark"
        ? theme.darkMode.miniText
        : theme.lightMode.miniText};
  }

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    h1 {
      font-size: 3.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    flex-grow: 1;
    flex-basis: 0;

    h1 {
      font-size: 4rem;
    }

    p {
      margin-top: 4rem;
    }
  }
`;


// Title container or wrapper for the title or headings in the Hero and Result page;
export const ContentWrapper = styled.div`
  /* Mobile */
  margin: 0;
  gap: 2rem;
  width: 100%;
  display: flex;
  outline: none;
  flex-direction: column;
  justify-content: space-between;

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    gap: 4rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    gap: 8rem;
    flex-direction: row;
  }
`;
