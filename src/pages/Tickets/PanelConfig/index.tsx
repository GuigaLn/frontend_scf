import React from 'react';
import { useHistory } from 'react-router';
import { Container } from './styles';

/*
* CONFIGURA O PAINEL
*/
const PanelConfig: React.FC = () => {
  const history = useHistory();

  function handdleNumber(sectorWindow: number, sectorName: string) {
    if(sectorWindow) {
      localStorage.setItem('@panel-ticket/sectorWindow', sectorWindow.toString());
      localStorage.setItem('@panel-ticket/sectorName', sectorName.toString());
      history.push("/panel");
    } else {
      alert("Selecione o Setor do Guichê!");
    }
  }

  return (
    <Container>
      <div>
        <h1>Qual o Setor do Painel?</h1>
        <button onClick={() => handdleNumber(1, 'FARMÁCIA')}>FARMÁCIA</button>
        <button onClick={() => handdleNumber(2, 'CONSULTAS')}>CONSULTAS</button>
        <button onClick={() => handdleNumber(3, 'EXAMES')}>EXAMES</button>
      </div>
    </Container>
  );
}

export default PanelConfig;