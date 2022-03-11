import styled from 'styled-components';

export const SideBar = styled.div<{ close: boolean }>`
  transition-duration: 0.5s;
  position: relative;

  
  z-index: 10;

  div.navbar {
    transition-duration: 0.5s;
    background-color: #F7F9FC;
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
      color: #606060;
    }
  }

  
  div.body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid #CCC;
    overflow: auto;
    max-height: 90vh;
 
    div.option {
      font-weight: 400;
      font-size: 18px;
      
      margin-top: 10px;
      padding: 10px 10px;
      border-radius: 5px;
      width: 100%;
      color: #808080;
      cursor: pointer;

      display: flex;
      transition: color 0.2s;
      justify-content: ${({ close }) => (close ? 'center' : 'flex-start')};

      span {
        margin-left: 10px;
        font-family: Arial, Helvetica, sans-serif;
        display: ${({ close }) => (close ? 'none' : 'flex')};
      }

      &.select {
        color: #1E97F7;
        background-color: #E8EDF3;
      }

      &:hover {
        color: #1E97F7;
      }
    }

  }
`;
