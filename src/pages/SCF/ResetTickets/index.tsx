import React, { useState } from 'react';
import { Container, Body } from './styles';
import SideBar from '../../../components/SideBar';
import { useHistory } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';

const ResetTickets: React.FC = () => {
  const history = useHistory();
  const [sectorId, setSectorId] = useState<Number>(0); 
  const [password, setPassword] = useState('');

  function submit() {
    if(password === '1294') {
      try {
        api.post('/resetTickets', {sectorId: sectorId}).then(response => {
          alert("Resetado com sucesso!");
          history.push("/scf/ticket/initialconfig");
        }).catch((err) => {
          console.log(err);
          toast.error('Erro ao Resetar!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }); 
      } catch (err) {
        console.log(err);
        toast.error('Erro ao Resetar!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    } else {
      toast.error('Senha Incorreta!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }


  return (
    <Container>
      <ToastContainer />
      <SideBar page='panel' />
      <Body>
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
      </Body>
    </Container>
  );
}

export default ResetTickets;