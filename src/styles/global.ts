import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
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
