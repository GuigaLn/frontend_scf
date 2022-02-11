import styled from 'styled-components';

export const SideBar = styled.div<{ close: boolean }>`
  transition-duration: 0.5s;
  background-color: #F7F9FC;
  position: relative;
  width: ${({ close }) => (close ? '10%' : '30%')};
  padding: 20px;
  
  z-index: 10;

  div.navbar {
    position: fixed;
    width: ${({ close }) => (close ? 'calc(10% - 48px)' : 'calc(30% - 136px)')};
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
    overflow: auto;

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
