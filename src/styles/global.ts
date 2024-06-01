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
    margin:0;
    padding:0;
    background-size: cover;
    background-position: center;
    transition: all 0.50s linear;
    background-repeat: no-repeat;
    font-family: 'Rubik', sans-serif;
    transition-property:color,background-image,background-color;
    
    color: ${({ theme }) => theme.mode === "dark"  ? theme.darkMode.text : theme.lightMode.text};
    background-color: ${({ theme }) =>
    ( theme.mode === "dark"  ? theme.darkMode.background : theme.lightMode.background)};
      background-image: url(${({ theme }) =>(`"/images/pattern-background-mobile-${theme.mode}.svg"`)});
  }


  /* Variable fonts if supported(browser) */
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
    background-image: url(${({ theme }) =>(`"/images/pattern-background-tablet-${theme.mode}.svg"`)});
    }
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1025px) {
    body{
    background-image: url(${({ theme }) =>(`"/images/pattern-background-desktop-${theme.mode}.svg"`)});

    }
  }

`;

export default GlobalStyle;
