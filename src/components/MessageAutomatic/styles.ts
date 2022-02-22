import styled from 'styled-components';

export const MessageAutomaticContainer = styled.div`
position: relative;

  .list_message_automatic {
    position: absolute;
    height: 200px;
    display: flex;
    flex-direction: column;
    background-color: #F0F0F0;
    padding: 10px;
    text-align: left;
    top: -220px;
    border: 1px solid #808080;
    border-radius: 10px;
    overflow-x: hidden;  
    overflow-y: auto;        

    .item_message_automatic {
      display: flex;
      justify-content: space-around;
      padding: 5px;
      width: 300px;
      cursor: pointer;
      transition: 0.3s all;

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-basis: 80%;
      }

      .icon_message_automatic {
        
      }

      &:hover {
        color: #1E97F7;
      }
    }
  }
`;