import React, { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../../services/api';
import { Container } from './styles';

const ResetTickets: React.FC = () => {
  const history = useHistory();
  const [sectorId, setSectorId] = useState<Number>(0); 
  const [password, setPassword] = useState('');

  function submit() {
    if(password === '1294') {
      try {
        api.post('/resetTickets', {sectorId: sectorId}).then(response => {
          alert("Resetado com sucesso!");
          history.push("/");
        }).catch((err) => {
          console.log(err);
          alert("Erro ao resetar");
        }); 
      } catch (err) {
        console.log(err);
        alert("Erro ao resetar");
      }

    } else {
      alert("Senha Inocorreta");
    }
  }

  return (
    <Container>
      <div className="body">
        <h1>Qual o Setor que será Resetado?</h1>
        <button onClick={() => setSectorId(1)}>FARMÁCIA</button>
        <button onClick={() => setSectorId(2)}>CONSULTAS</button>
        <button onClick={() => setSectorId(3)}>EXAMES</button>
      </div>
      { sectorId !== 0 ? 
      <div className="modal">
        <h1>Confirme o Reset</h1>
        <input type="password" placeholder="Digite sua Senha" onChange={(e) => setPassword(e.currentTarget.value)}></input>
        <button onClick={submit}>RESETAR</button>
      </div> : <div></div>
      }
    </Container>
  );
}

export default ResetTickets;