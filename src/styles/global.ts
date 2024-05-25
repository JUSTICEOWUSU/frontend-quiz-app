import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

  /* Static font definitions */
  @font-face {
    font-family: 'Rubik';
    src: url('/fonts/static/Rubik-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Rubik';
    src: url('/fonts/static/Rubik-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Rubik Italic';
    src: url('/fonts/static/Rubik-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }

  /* Fallback font family */
  body {
    font-family: 'Rubik', sans-serif;
    padding:0;
    margin:0;
    background-image: url(${({ theme }) => (theme.mode === "dark" ? "/images/pattern-background-mobile-dark.svg" : "/images/pattern-background-mobile-light.svg")});
    background-size: cover;
   background-repeat: no-repeat;
  background-position: center;
  transition:all 30ms ease-in-out;
  color: ${({ theme }) => theme.mode === "dark"  ? theme.darkMode.text : theme.lightMode.text};
  background-color: ${({ theme }) =>
   ( theme.mode === "dark"  ? theme.darkMode.background : theme.lightMode.background)};

  }



  /* Variable fonts if supported */
  @supports (font-variation-settings: normal) {
    @font-face {
      font-family: 'Rubik Variable';
      src: url('/fonts/Rubik-VariableFont_wght.ttf') format('truetype-variations');
      font-weight: 100 900;
      font-style: normal;
    }

    @font-face {
      font-family: 'Rubik Variable Italic';
      src: url('/fonts/Rubik-Italic-VariableFont_wght.ttf') format('truetype-variations');
      font-weight: 100 900;
      font-style: italic;
    }

    body {
      font-family: 'Rubik Variable', sans-serif;

    }
  }

      /* Tablets (640px->) */
  @media (min-width: 640px) {
    body{
    background-image: url(${({ theme }) =>( theme.mode === "dark" ? "/images/pattern-background-tablet-dark.svg": "/images/pattern-background-tablet-light.svg")});
    }
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    body{
    background-image: url(${({ theme }) =>( theme.mode === "dark" ? "/images/pattern-background-desktop-dark.svg": "/images/pattern-background-desktop-light.svg")});

    }
  }

`;

export default GlobalStyle;
