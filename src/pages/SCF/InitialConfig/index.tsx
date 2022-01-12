import React, { useState } from 'react';
import { Container, Body } from './styles';
import SideBar from '../../../components/SideBar';
import { useHistory } from 'react-router';

const InitialConfig: React.FC = () => {
  const [windowNumber, setWindownNumber] = useState("1");
  const history = useHistory();

  function handdleNumber() {
    if(windowNumber) {
      localStorage.setItem('@panel-ticket/numberWindow', windowNumber);
      history.push("/scf/ticket/secondconfig");
    } else {
      alert("Digite o Número do Guichê!");
    }
  }

  return (
    <Container>
      <SideBar page='panel' />
      <Body>
        <div>
          <h1>Número do Guichê</h1>
          <input type="text" placeholder="Exmp. 01" onChange={(e) => setWindownNumber(e.target.value)}></input>
          <button onClick={handdleNumber}>PROSSEGUIR</button>
          <button onClick={() => history.push('/scf/ticket/resettickets')}>RESETAR FICHAS</button>
        </div>
      </Body>
    </Container>
  );
}

export default InitialConfig;