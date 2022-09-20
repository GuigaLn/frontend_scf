import React from 'react';
import { useHistory } from 'react-router';
import SideBar from '../../../components/SideBar';
import { Body, Container } from './styles';

const SecondConfig: React.FC = () => {
  const history = useHistory();

  function handdleNumber(sectorWindow: number, sectorName: string) {
    if(sectorWindow) {
      localStorage.setItem('@panel-ticket/sectorWindow', sectorWindow.toString());
      localStorage.setItem('@panel-ticket/sectorName', sectorName.toString());
      history.push("/scf/ticket/calltickets");
    } else {
      alert("Selecione o Setor do Guichê!");
    }
  }

  return (
    <>
      <Container>
        <SideBar page='panel' />
        <Body>
          <div>
            <h1>Qual o seu Setor?</h1>
            <button onClick={() => handdleNumber(1, 'FARMÁCIA')} className="editar">FARMÁCIA</button>
            <button onClick={() => handdleNumber(2, 'CONSULTAS')} className="editar">CONSULTAS</button>
            <button onClick={() => handdleNumber(3, 'EXAMES')} className="editar">EXAMES</button>
          </div>
        </Body>
      </Container>
    </>
  );
}

export default SecondConfig;