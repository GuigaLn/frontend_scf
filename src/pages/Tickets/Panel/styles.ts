import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .call {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #004CAA;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .name-sector {
      color: #FFF;
      
      font-size: 2rem;
      font-weight: 900;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      img {
        height: 100%;
        max-height: 100px;
      }

      h1 {
        margin-top: 20px;
      }
    }

    .atually {
      color: #FFF;

      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;

      h2 {
        color: #FAE900;
        font-size: 8rem;
      }

      p {
        color: #FAE900;
        text-align: center;
        font-weight: 600;
        font-size: 5rem;
      }
    }
  }

  div.header {
    padding: 20px;
    background: #004CAA;
    flex: 1;
    display: flex;
    flex-direction: column;

    .name-sector {
      color: #FFF;
      
      font-size: 2rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: space-around;

      img {
        height: 100%;
        max-height: 100px;
      }
    }

    .atually {
      color: #FFF;

      display: flex;
      align-items: center;
      justify-content: space-around;
      flex: 1;

      h2 {
        color: #FAE900;
        font-size: 10rem;
      }

      p {
        color: #FAE900;
        text-align: center;
        font-weight: 600;
        font-size: 5rem;
      }
    }
  }

  .body { 
    background: #FFF;

    .lasted {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;

      justify-content: space-around;
      align-items: center;

      > div {
        text-align: center;
        color: #022871;
        padding: 10px;

        p.senha {
          font-size: 4.5rem;
          font-weight: 900;
          line-height: 4.5rem;
        }

        p.guiche {
          line-height: 2rem;
          font-size: 2rem;
          font-weight: 500;
        }        
      }
    }
    
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 11;

  div {
    background-color: #FFF;
    padding: 20px;

    h1 {
      color: red;
    }

    p {
      margin-top: 20px;
      font-weight: 400;
      font-size: 20px;
      color: #404040;
      font-family: Arial, Helvetica, sans-serif;
    }

    p.errorId {
      font-size: 16px !important;
    }
  }
`;