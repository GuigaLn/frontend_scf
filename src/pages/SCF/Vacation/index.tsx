import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container } from './styles';
// @ts-ignore
import Printer from 'react-pdf-print';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { useAuth } from '../../../context/AuthContext';

interface Request {
  id: string;
}

const Vacation: React.FC = () => {
  const { id } = useParams<Request>();
  const { signOut } = useAuth();
  
  const ids = ['printer'];

  const [dateNow, setDateNow] = useState();
  const [name, setName] = useState();

  const [text, setText] = useState('');

  useEffect(() => {
    try {
      api.post('/vacation/detail', {id}).then(response => {
        setText(response.data.text)
        setDateNow(response.data.dateNow)
        setName(response.data.name);
        setTimeout(() => {
         window.print()
        }, 500);
        return;
      }).catch((err: AxiosError) => {
        if(err.response?.status === 401) {
          signOut();
          return;
        }
        console.log(err.response);
        return;
      });
    } catch (err: any) {
      return;
    }
    // FALTA OCUPAÇÃO e DATA FINAL!!
  }, []);

/* 
 <input type='button'
          onClick={() => print(ids)} value='Stampa' 
        />
        
*/
  return (
    <Container>
      <div className='App'>
       
        <Printer>
          <div id={ids[0]} className='printer' style={{ width:'210mm' }}>
            <h1>V. EX.ª PREFEITO MUNICIPAL DE CRUZ MACHADO</h1>

            <div className='dateNow'>{dateNow}</div> 

            <div className="requiriment">REQUERIMENTO</div>

            <div className="text">{text}</div> 

            <div className="terms">Nestes Termos <br />Aguardo Deferimento</div> 

            <div className="graciously">Atenciosamente</div>

            <table className='tableSign'>
              <tbody>
                <tr> 
                  <td>________________________________</td>
                  <td>________________________________</td>
                </tr>
                <tr> 
                  <td>{name}</td>
                  <td>SECREATRIA DE SAÚDE</td>
                </tr>
              </tbody>
            </table>           
          </div>
        </Printer>
      </div>
    </Container>
  );
}

export default Vacation;