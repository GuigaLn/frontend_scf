import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Container } from './styles';

import { AxiosError } from 'axios';
// @ts-ignore
import Printer from 'react-pdf-print';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

import signtureGrazzi from '../../../assets/signtureGrazzi.png';
import signtureMarcos from '../../../assets/signtureMarcos.png';


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
  const [autorizedBy, setAutorizedBy] = useState(0);

  const [text, setText] = useState('');

  useEffect(() => {
    try {
      api.post('/vacation/detail', {id}).then(response => {
        if(response.data === undefined) { alert('NÃO FOI AUTORIZADO!'); return history.push(`/scf/employee/listvacation`); }        
        setText(response.data.text)
        setDateNow(response.data.dateNow)
        setName(response.data.name);
        setAutorizedBy(response.data.autorizedBy);
        console.log(response.data.autorizedBy)
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
                      {autorizedBy === 11 ? 
                      <img src={signtureMarcos} alt="signture" /> :  <img src={signtureGrazzi} alt="signture" />
                    }
                    </div>
                    <hr />
                  </td>
                </tr>
                {autorizedBy === 11 ? 
                <tr> 
                  <td><b>{name}</b></td>
                  <td><b>MARCOS MARCZAL</b><br/>SEC. MUN. DE TRANSPORTE<br/>DECRETO Nº 3451/2021</td>
                </tr>
                :  <tr> 
                <td><b>{name}</b></td>
                <td><b>GRAZIELA BRAUN</b><br/>SEC. MUN. DE SAÚDE<br/>DECRETO Nº 3677/2021</td>
              </tr> }
              </tbody>
            </table>           
          </div>
        </Printer>
      </div>
    </Container>
  );
}

export default Vacation;