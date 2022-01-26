import React from 'react';
import { useHistory } from 'react-router';
import { Container } from './styles';

const InitialRouter: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <div>
        <h1>Número do Guichê</h1>
        <button onClick={() => history.push('/scf')}>SISTEMA</button>
        <button onClick={() => history.push('/panelconfig')}>PAINEL</button>
      </div>
    </Container>
  );
}

export default InitialRouter;