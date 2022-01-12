import styled from 'styled-components';

//import { shade } from 'polished';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    div.printer {
      width: 100%;
      padding: 20px;

      h1 {
        font-size: 28px;
        text-align: center;
      }

      h2 {
        font-size: 16px;
        padding: 5px;
        text-align: center;
        border: 1px solid black;
        margin-top: 20px;
      }

      table.tableSign {
        width: 100%;
        margin-top: 40px;
       

        tr {
          width: 100%;

          td {
            text-align: center;
          }
        }
      }

      table.tableTimes {
        width: 100%;
        margin-top: 20px;
        border-spacing: 1px;
        
        tr {
          width: 100%;

          th {
            border-collapse: collapse;
            border: 1px solid black;
          }

          &.times {
            td {
              text-align: center;
              padding: 3px;
              border-collapse: collapse;
              border: 1px solid black;
            }
          }
        }
      }
    }

`;