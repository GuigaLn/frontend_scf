import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Container } from './styles';
// @ts-ignore
import Printer from 'react-pdf-print';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { useAuth } from '../../../context/AuthContext';

import logo from '../../../assets/signture.png';

interface Request {
  id: string;
}

const Vacation: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Request>();
  const { signOut } = useAuth();
  
  const ids = ['printer'];

  const [dateNow, setDateNow] = useState();
  const [name, setName] = useState();

  const [text, setText] = useState('');

  useEffect(() => {
    try {
      api.post('/vacation/detail', {id}).then(response => {
        if(response.data === undefined) { alert('NÃO FOI AUTORIZADO!'); return history.push(`/scf/employee/listvacation`); }        
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
        alert('NÃO FOI AUTORIZADO!');
        return history.push(`/scf/employee/listvacation`);
      });
    } catch (err: any) {
      return;
    }
  }, []);

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
                  <td><hr /></td>
                  <td className="signture">
                    <div>
                      <img src={logo} alt="signture" />
                    </div>
                    <hr />
                  </td>
                </tr>
                <tr> 
                  <td><b>{name}</b></td>
                  <td><b>GRAZIELA BRAUN</b><br/>SEC. MUN. DE SAÚDE<br/>DECRETO Nº 3677/2021</td>
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