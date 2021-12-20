import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Container } from './styles';

const InitialConfig: React.FC = () => {
  const [windowNumber, setWindownNumber] = useState("1");
  const history = useHistory();

  function handdleNumber() {
    if(windowNumber) {
      localStorage.setItem('@panel-ticket/numberWindow', windowNumber);
      history.push("/second");
    } else {
      alert("Digite o Número do Guichê!");
    }
  }

  return (
    <Container>
      <div>
        <h1>Número do Guichê</h1>
        <input type="text" placeholder="Exmp. 01" onChange={(e) => setWindownNumber(e.target.value)}></input>
        <button onClick={handdleNumber}>PROSSEGUIR</button>
        <button onClick={() => history.push('/panelconfig')}>PAINEL</button>
        <button onClick={() => history.push('/resettickets')}>RESETAR FICHAS</button>
      </div>
    </Container>
  );
}

export default InitialConfig;