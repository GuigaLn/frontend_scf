import styled from 'styled-components';

export const SideBar = styled.div<{ close: boolean }>`
  transition-duration: 0.5s;
  position: relative;

  
  z-index: 10;

  div.navbar {
    transition-duration: 0.5s;
    background-color: var(--background);
    height: 100vh;
    position: fixed;
    padding: ${({ close }) => (close ? '10px 0px' : '10px 20px')};
    width: ${({ close }) => (close ? '100px' : '300px')};
  }

  div.header {
    display: flex;
    align-items: center;
    justify-content: ${({ close }) => (close ? 'center' : 'space-between')};
    margin-bottom: 10px;

    img {
      display: ${({ close }) => (close ? 'none' : 'flex')};
      width: 40px;
    }

    strong {
      display: ${({ close }) => (close ? 'none' : 'flex')};
      font-family: Arial, Helvetica, sans-serif;
      color: var(--white);
    }

    svg {
      color: var(--background-button);
    }
  }

  
  div.body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  
    overflow: auto;
    max-height: 90vh;
 
    div.option {
      font-weight: 400;
      font-size: 18px;
      flex-basis: 51%;
      
      margin-top: 10px;
      padding: 10px 10px;
      border-radius: 5px;
    
      color: var(--white);
      cursor: pointer;       
      background-color: ${({ close }) => (close && '#2f2c45')};

      flex-basis: ${({ close }) => (!close && '100%')};
     

      display: flex;
      transition: color 0.2s;
      justify-content: ${({ close }) => (close ? 'center' : 'flex-start')};


      span {
        margin-left: 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        display: ${({ close }) => (close ? 'none' : 'flex')};
      }

      &.select {
        color: var(--white);
        background-color: var(--background-button);
      }

      &:hover {
        color: var(--background-button);
      }
    }

  }
`;
