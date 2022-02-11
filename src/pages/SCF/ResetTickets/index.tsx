import React, { useState } from 'react';
import { Container, Body, Modal } from './styles';
import SideBar from '../../../components/SideBar';
import { useHistory } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { useAuth } from '../../../context/AuthContext';

const ResetTickets: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();
  const [sectorId, setSectorId] = useState<Number>(0); 
  const [password, setPassword] = useState('');

  function submit() {
    if(password === '1294') {
      try {
        api.post('/resetTickets', {sectorId: sectorId}).then(response => {
          alert("Resetado com sucesso!");
          history.push("/scf/ticket/initialconfig");
        }).catch((err: AxiosError) => {
          if(err.response?.status === 401) {
            signOut();
            return;
          }

          console.log(err.response);
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
    <>
      <ToastContainer />  
      <Container>
        <SideBar page='panel' />
        <Body>
          <div className="body">
            <h1>Qual o Setor que será Resetado?</h1>
            <button onClick={() => setSectorId(1)}>FARMÁCIA</button>
            <button onClick={() => setSectorId(2)}>CONSULTAS</button>
            <button onClick={() => setSectorId(3)}>EXAMES</button>
          </div>
        </Body>
      </Container>
      { sectorId !== 0 &&
        <Modal>
          <div>
            <h1>Confirme o Reset</h1>
            <input type="password" placeholder="Digite sua Senha" onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <button className="editar" onClick={submit}>RESETAR</button>
            <button className="cancelar" onClick={() => setSectorId(0)}>CANCELAR</button>
          </div>
        </Modal>
      }
    </>
  );
}

export default ResetTickets;