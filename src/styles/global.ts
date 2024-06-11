import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

/* Variable fonts if supported(browser) */
  @supports (font-variation-settings: normal) {
    @font-face {
      font-family: 'Rubik Variable';
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
      src: url('/fonts/Rubik-VariableFont_wght.ttf') format('truetype-variations');
      
    }

    @font-face {
      font-family: 'Rubik Variable Italic';
      font-weight: 100 900;
      font-style: italic;
      font-display:swap;
      src: url('/fonts/Rubik-Italic-VariableFont_wght.ttf') format('truetype-variations');
      
    }
  }

/* Fallback font family */

  /* Static font definitions */
  @font-face {
    font-family: 'Rubik';
    font-weight: normal;
    font-style: normal;
    src: url('/fonts/static/Rubik-Regular.ttf') format('truetype');

  }

  @font-face {
    font-family: 'Rubik';
    font-weight: bold;
    font-style: normal;
   src: url('/fonts/static/Rubik-Bold.ttf') format('truetype');

    
  }

  @font-face {
    font-family: 'Rubik Italic';
    font-weight: normal;
    font-style: italic;
    src: url('/fonts/static/Rubik-Italic.ttf') format('truetype');

  }

  * {
  box-sizing: border-box;
  font-family: 'Rubik','Rubik Variable', sans-serif;

}

  body {
    margin:0;
    padding:0;
    background-size: cover;
    background-position: center;
    transition: all 0.50s linear;
    background-repeat: no-repeat;
    font-family:'Rubik', 'Rubik Variable', sans-serif;
    transition-property:color,background-image,background-color;
    
    color: ${({ theme }) => theme.mode === "dark"  ? theme.darkMode.text : theme.lightMode.text};
    background-color: ${({ theme }) =>
    ( theme.mode === "dark"  ? theme.darkMode.background : theme.lightMode.background)};
      background-image: url(${({ theme }) =>(`"/images/pattern-background-mobile-${theme.mode}.svg"`)});
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
