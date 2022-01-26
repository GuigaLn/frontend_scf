import styled from 'styled-components';

//import { shade } from 'polished';

export const Container = styled.div`
    @page {
      size: auto;
      margin: 0;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;

    div.printer {
      width: 100%;
      padding: 20px;
      
      div.header {
        display: flex;
        align-items: center;
        justify-content: space-around;

        img {
        width: 3.4cm;
        }

        h1 {
          color: #104670;
          font-size: 22px;
        }
      }   

      table {
        margin-top: 20px;
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
        text-align: left;

        .text-align-center {
          text-align: center;
        }

        thead {
          tr {
            th {
              font-weight: 500;
              border: 1px solid black;
              border-collapse: collapse;
              padding: 5px 10px;
            }

            th:last-child {
              width: 35%;
            }
          }

          tr:last-child {
            text-align: justify;
          }
        }

        tbody {
          tr {
            td {
              color: #FFF;
              font-weight: 500;
              border: 1px solid black;
              border-collapse: collapse;
              padding: 14px 10px;
            }
          }
        }
        
      }
    }
      
`;