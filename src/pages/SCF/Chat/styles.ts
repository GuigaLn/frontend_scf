import { shade } from 'polished';
import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: space-around;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: calc(100% - 300px);
  flex-direction: column;
  margin-left: 300px;
  height: 100%;
`;

export const ContainerChat = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  max-height: 100vh;
`;

export const Contacts = styled.div`
  background-color: #F0F0F0;
  flex-basis: 30%;
  height: 100%;
  text-align: center;

  padding: 0px 0px;
  
  border-right: 1px solid rgba(0,0,0,0.2);
  overflow-y: auto;
`;

export const Contact = styled.div`
  display: flex;
  align-items: left;
  padding: 10px 15px;
  flex-wrap: wrap;
  text-align: left;

  border-bottom: 1px solid rgba(0,0,0,0.1);

  transition: background-color 0.3s;
  transition: opacity 0.3s;

  &:hover {
    background-color: #E0E0E0;
  }

  &.activeChat {
    opacity: 0.9;
    color: black;
    background-color: #1E97F7;

    p {
      color: #000;
    }
  }
`; 

export const ContactInformation = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  div {
    flex-basis: 80%;

    strong {
      color: #000;
      font-size: 14px;
    }

    p {
      margin-top: 5px;
      color: #606060;
      font-weight: bold;
      font-size: 12px;
    }
  }

  span {
    height: 100%;
    border: 2px solid #1E97F7;
    border-radius: 10px;
  }
`; 

export const Menssagens = styled.div`
  background-color: #FFF;
  flex-basis: 79%;
  height: 99%;

  overflow-y: scroll;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  scroll-behavior: smooth;

  .sendMessage {
    display: flex;
    justify-content: space-between;

    input {
      margin-left: 5%;
      width: 60%;
      font-size: 16px;
      padding: 5px 20px;
    }

    button {
      width: 30%;
    }
  }
`;

export const ItemMessage = styled.div`

  display: flex;
  padding: 20px;
  width: 100%;

  div {
    flex-basis: 40%;
    background: #F0F0F0;
    display: flex;
    flex-direction: column;

    box-shadow: 0px 0px 1px #333;
    border-radius: 5px;
    padding: 10px 20px;
    position: relative;
    scroll-margin-bottom: 0;
  }
  
  &.right {
    justify-content: flex-end;
    text-align: left;
  }

  &.left {
    justify-content: flex-start;
    text-align: left;
  }

  strong {
    font-size: 14px;
    font-weight: 400;
  }

  span {
    margin-top: 5px;
    text-align: right;
    font-size: 13px;
  }
`;