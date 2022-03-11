import styled from 'styled-components';

export const Contacts = styled.div`
  background-color: #FFF;
  flex-basis: 30%;
  height: 100%;
  text-align: center;

  padding: 0px 0px;
  
  border-right: 1px solid rgba(0,0,0,0.2);
  overflow-y: auto;

  div.sector {
    padding: 10px;
    display: flex;
    align-items: center;
    margin-top: 20px;

    strong {
      background-color: #1E97F7;
      padding: 5px 15px;
      font-size: 14px;
      border-radius: 10px;
      color: #FFF;
      font-weight: 600;
    }

    span {
      margin-left: 10px;
      color: #808080;
      font-size: 14px;
    }
  }

  .search_chat {
    margin: 0 auto;
    width: calc(100% - 15px);
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    align-items: center;
    display: flex;
    margin-bottom: 10px;
    margin-top: 15px;

    input {
      padding: 5px;
      flex: 1;
      border none;
    }

    .icon_search {
      margin-left: 10px;
      color: #1E97F7;
    }
  }
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
    background-color: #F8F8F8;
  }

  &.activeChat {
    opacity: 0.9;
    color: black;
    background-color: #E0E0E0;

    p {
      color: #000;
    }
  }
`; 

export const ContactInformation = styled.div<{ attendance: boolean }>`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;

  div.content {
    display: flex;
    align-items: center;
    width: 100%;

    .information {
      padding: 0px 15px;
      flex-basis: 1;

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

  div.attendent {
    text-align: center;
    margin-top: 10px;
    width: 100%;
    flex-basis: 1;

    span.tag_attendance {
      font-size: 14px;
      padding: 2px 5px;
      background-color: ${({ attendance }) => (attendance ? '#1E97F7' : '#e61919')};
      color: #FFF;
      border-radius: 5px;
    }

    span.time_last_message {
      position: absolute;
      font-size: 14px;
      color: #808080;
      right: 0;
    }

  }
`; 
