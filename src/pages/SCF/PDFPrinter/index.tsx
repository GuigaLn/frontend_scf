import React, { useEffect, useState } from 'react';
import { Container } from './styles';
// @ts-ignore
import Printer from 'react-pdf-print';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { AxiosError } from 'axios';

interface ApiResponseData {
  day: string,
  obs: string,
  one: string,
  oneout: string,
  two: string,
  twoout: string,
  week: string,
}

const PDFPrinter: React.FC = () => {
  const { signOut } = useAuth();
  const ids = ['printer'];
  
  const [data, setData] = useState<ApiResponseData[]>([{day: '', obs: '', one: '', oneout: '', two: '', twoout: '', week: ''}]);
  const [nameEmployee, setNameEmployee] = useState('');
  const [month, setMonth] = useState<any>('');

  useEffect(() => {
    promiseLoadingData();
  }, []);

  let promiseLoadingData = () => {
   
   new Promise((resolve, reject) => {
      try {
        api.post('time/detail', {id: 6}).then(response => {
          setData(response.data.times);
          setMonth(getMonth(response.data.times[0].day.substring(3, 5)));
          console.log(response.data)
          if(response.data.customer) {
            setNameEmployee(response.data.customer);
          }
          setTimeout(resolve);
          return;
        }).catch((err: AxiosError) => {
          if(err.response?.status === 401) {
            signOut();
            return;
          }
          console.log(err.response);
          setTimeout(reject);
          return;
        }); 
      } catch (err) {
        setTimeout(reject);
        return;
      }
    });
  }

  function getMonth(monthNumber: string) {
    if(monthNumber === '01') return 'JANEIRO';
    if(monthNumber === '02') return 'FEVEREIRO';
    if(monthNumber === '03') return 'MARÇO';
    if(monthNumber === '04') return 'ABRIL';
    if(monthNumber === '05') return 'MAIO';
    if(monthNumber === '06') return 'JUNHO';
    if(monthNumber === '07') return 'JULHO';
    if(monthNumber === '08') return 'AGOSTO';
    if(monthNumber === '09') return 'SETEMBRO';
    if(monthNumber === '10') return 'OUTUBRO';
    if(monthNumber === '11') return 'NOVEMBRO';
    if(monthNumber === '12') return 'DEZEMBRO';
  }
/* 
 <input type='button'
          onClick={() => print(ids)} value='Stampa' 
        />
        
*/
  return (
    <Container>
      <div className='App'>
       
        <Printer>
          <div id={ids[0]} className='printer' style={{ width:'210mm', height: '297mm' }}>
            <h1>FOLHA PONTO - {month}</h1>

            <h2>{nameEmployee}</h2>

            <table className='tableTimes'>
              <tr>
                <th>DIA</th>
                <th>SEM</th>
                <th>1ª ENTRADA</th>
                <th>1ª SAÍDA</th>
                <th>2ª ENTRADA</th>
                <th>2ª SAÍDA</th>
                <th>OBS:</th>
              </tr>

              {data.map(item => (
                <tr className='times'>
                  <td>{item.day.substring(0, 2)}</td>
                  <td>{item.week}</td>
                  <td>{item.one}</td>
                  <td>{item.oneout}</td>
                  <td>{item.two}</td>
                  <td>{item.twoout}</td>
                  <td>{item.obs}</td>
                </tr>
              ))}
            </table>  

            <table className='tableSign'>
              <tr> 
                <td>________________________________</td>
                <td>________________________________</td>
              </tr>
              <tr> 
                <td>SECREATRIA DE SAÚDE</td>
                <td>{nameEmployee}</td>
              </tr>
            </table>           
          </div>
        </Printer>
      </div>
    </Container>
  );
}

export default PDFPrinter;