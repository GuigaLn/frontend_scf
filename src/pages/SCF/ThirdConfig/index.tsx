import React from 'react';
import { useHistory } from 'react-router';
import SideBar from '../../../components/SideBar';
import { Body, Container } from './styles';

const ThirdConfig: React.FC = () => {
  const history = useHistory();

  function handdleType(mode: 'NORMAL' | 'PRIORITARIO', modeName: string) {
    if(mode) {
      localStorage.setItem('@panel-ticket/mode', mode);
      localStorage.setItem('@panel-ticket/modeName', modeName);
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
            <h1>Qual ordem de chamado?</h1>
            <button onClick={() => handdleType('NORMAL', 'NORMAL')} className="editar">NORMAL</button>
            <button onClick={() => handdleType('PRIORITARIO', 'PRIORITÁRIO')} className="editar">PRIORITÁRIO</button>
          </div>
        </Body>
      </Container>
    </>
  );
}

export default ThirdConfig;