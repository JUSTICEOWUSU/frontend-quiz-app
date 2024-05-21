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
`;

export default GlobalStyle;
