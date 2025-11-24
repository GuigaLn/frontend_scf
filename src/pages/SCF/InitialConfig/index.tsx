import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SideBar from '../../../components/SideBar';
import { Body, Container } from './styles';

const InitialConfig: React.FC = () => {
  const [windowNumber, setWindownNumber] = useState("1");
  const history = useHistory();

  function handdleNumber() {
    if(windowNumber) {
      localStorage.setItem('@panel-ticket/sectorWindow', '1');
      localStorage.setItem('@panel-ticket/sectorName', 'FARMÁCIA');

      localStorage.setItem('@panel-ticket/numberWindow', windowNumber);
      history.push("/scf/ticket/thirdconfig");
    } else {
      alert("Digite o Número do Guichê!");
    }
  }

  return (
    <>
      <Container>
        <SideBar page='panel' />
        <Body>
          <div>
            <h1>Número do Guichê</h1>
            <input type="text" placeholder="Exmp. 01" onChange={(e) => setWindownNumber(e.target.value)}></input>
            <button onClick={handdleNumber} className="editar">PROSSEGUIR</button>
            <button onClick={() => history.push('/scf/ticket/resettickets')} className="excluir">RESETAR FICHAS</button>
          </div>
        </Body>
      </Container>
    </>
  );
}

export default InitialConfig;