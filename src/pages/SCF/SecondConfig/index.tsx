import React from 'react';
import { Container, Body } from './styles';
import SideBar from '../../../components/SideBar';
import { useHistory } from 'react-router';

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
    <Container>
      <SideBar page='panel' />
      <Body>
        <div>
          <h1>Qual o seu Setor?</h1>
          <button onClick={() => handdleNumber(1, 'FARMÁCIA')}>FARMÁCIA</button>
          <button onClick={() => handdleNumber(2, 'CONSULTAS')}>CONSULTAS</button>
          <button onClick={() => handdleNumber(3, 'EXAMES')}>EXAMES</button>
        </div>
      </Body>
    </Container>
  );
}

export default SecondConfig;