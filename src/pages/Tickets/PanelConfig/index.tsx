import React from 'react';
import { useHistory } from 'react-router';
import { Container } from './styles';

/*
* CONFIGURA O PAINEL
*/
const PanelConfig: React.FC = () => {
  const history = useHistory();

  function handdleNumber(sectorName: string) {
    if(sectorName) {
      localStorage.setItem('@panel-ticket/sectorName', sectorName.toString());
      history.push("/panel");
    } else {
      alert("Selecione o Setor!");
    }
  }

  return (
    <Container>
      <div>
        <h1>Qual o Setor do Painel?</h1>
        <button onClick={() => handdleNumber('FARMACIA')}>FARMÁCIA</button>
        <button onClick={() => handdleNumber('CONSULTA')}>CONSULTAS</button>
        <button onClick={() => handdleNumber('EXAME')}>EXAMES</button>
      </div>
    </Container>
  );
}

export default PanelConfig;