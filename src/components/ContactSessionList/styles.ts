import styled from 'styled-components';

export const Contacts = styled.div`
  background-color: #FFF;
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

  div.content {
    flex-basis: 80%;
    display: flex;

    .information {
      padding: 0px 15px;

      strong {
        color: #000;
        font-size: 15px;
      }

      p {
        margin-top: 5px;
        color: #606060;
        font-weight: bold;
        font-size: 12px;
      }
    }

    .img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  span {
    height: 100%;
    border: 2px solid #1E97F7;
    border-radius: 10px;
  }
`; 
