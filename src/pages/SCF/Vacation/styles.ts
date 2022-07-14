import styled from 'styled-components';

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
      padding: 80px;

      h1 {
        font-size: 18px;
        text-align: center;
        font-weight: 400;
        font-family: 'Times New Roman'
      }

      .dateNow {
        width: 100%;
        font-size: 18px;
        text-align: right;
        font-weight: 400;
        font-family: 'Times New Roman';

        margin-top: 22px;
      }

      .requiriment {
        width: 100%;
        font-size: 18px;
        text-align: center;
        font-weight: 700;
        font-family: 'Times New Roman';

        margin-top: 80px;
      }

      .text {
        width: 100%;
        font-size: 18px;
        text-align: justify;
        font-weight: 400;
        font-family: 'Times New Roman';

        margin-top: 80px;
      }

      .terms {
        width: 100%;
        font-size: 18px;
        font-weight: 400;
        font-family: 'Times New Roman';
        margin-left: 40px;

        margin-top: 80px;
      }

      .graciously {
        width: 100%;
        font-size: 18px;
        font-weight: 400;
        font-family: 'Times New Roman';
        margin-left: 40px;

        margin-top: 60px;
      }

      table.tableSign {
        width: 100%;
        margin-top: 120px;
       
        .signture {
          > div {
            position: relative;
            img {
              position: relative;
              top: 25px;
              width: 100%;
              max-width: 200px;
            }
          }
        }

        tr {
          
          width: 100%;
          display: flex;
          justify-content: space-around;
          
          &:first-child {
            margin-bottom: 10px;

            td {
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              text-align: center;
              align-items: center;

              hr {
                width: 80%;
                border: none;
                border-top: 1px solid black;
              }
            }
          }

          td {
            flex-basis: 100%;
            text-align: center;           
          }
        }
      }
    }

`;