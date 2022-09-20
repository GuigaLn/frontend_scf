import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --background: #28243d;
    --background-two: #312d4b;
    --background-button: #1E97F7;
    --border-input: #535f7d;
    --white: #FEFEFE;
    --border-table: #AAA;
    --text: #FEFEFE;
    --black: #000;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    -webkit-font-somoothing: antialiased;
  }

  body, input, button{
    font: 16px Nunito, sans-serif;
  }

  button{
    cursor: pointer;
  }

  #root {
    margin: 0 auto;
    padding: 0 0px;
  }
`;
