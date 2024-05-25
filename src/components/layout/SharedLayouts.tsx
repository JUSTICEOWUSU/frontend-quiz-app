import styled from 'styled-components';

// Buttons container or wrapper for the buttons in the Hero and Subjects page
export const ButtonsWrapper = styled.div`
  /* Mobile */
  width: 100%;
  gap: 1rem;
  display: flex;
  padding: 0;
  justify-content: space-between;
  flex-direction: column;

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
    font-size: 2.5rem;
    margin: 0;
    padding-top: 0;
    font-family: "Rubik Variable", "Rubik", sans-serif;
    font-weight: 300;

    span {
      font-weight: 500;
    }
  }

  p {
    margin-top: 1rem;
    font-family: "Rubik Italic", "Rubik", sans-serif;
    color: ${({ theme }) =>
      theme.mode == "dark"
        ? theme.darkMode.miniText
        : theme.lightMode.miniText};
    font-size: 0.875rem;
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
    flex-basis: 0;
    flex-grow: 1;

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
  width: 100%;
  margin: 0;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  border:1px solid red;
  justify-content: space-between;

  /* Tablets (640px->) */
  @media (min-width: 640px) {
    gap: 4rem;
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    flex-direction: row;
    gap: 8rem;
  }
`;
