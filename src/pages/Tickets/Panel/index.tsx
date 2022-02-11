import { gql, useSubscription } from '@apollo/react-hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

/*
* FALTA RECEBER AS SENHAS ATRAVÉS DO SOCKET E ATUALIZAR O PAINEL
*/
const Panel: React.FC = () => {
  const [sectorName, setSectorName] = useState("FARMACIA");
  const audioCall = useMemo(() => new Audio('/sound.mp3'), []);
  const history = useHistory();

  useEffect(() => {
    var sectorNameLocal = localStorage.getItem("@panel-ticket/sectorName");

    if(sectorNameLocal === "FARMACIA" || sectorNameLocal === "CONSULTA" || sectorNameLocal === "EXAME") {
      setSectorName(sectorNameLocal)
    } else {
      history.push("/panelconfig");
    }

    audioCall.play();
  }, [audioCall, history]);


  const NOTIFY_NEW_PUBLIC_TODOS = gql`
    subscription MySubscription {
      chamados(where: {setor: {nome: {_eq: "${localStorage.getItem("@panel-ticket/sectorName")}"}}}, limit: 4, order_by: {id: desc}) {
        id
        numero
        setor_id
        guiche
      }
    }
  `;
  
  const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);

  useEffect(() => {
    if(data !== undefined) {
      updateList(data.chamados);
      audioCall.play();
    }

    if (error?.message === 'Observable cancelled prematurely') {
      window.location.reload();
    }

    if(error) {
      console.log(error)
    }
    
  }, [audioCall, data, error]);

  /* EVITAR ERROS */
  const defaultList = [
    {id: 0, numero: '-', guiche: '-'},
    {id: 0, numero: '-', guiche: '-'},
    {id: 0, numero: '-', guiche: '-'},
    {id: 0, numero: '-', guiche: '-'}
  ]

  const [list, updateList] = useState(defaultList);

  return (
    <Container>
      <div className="header">
        <p>CENTRO DE SAÚDE DR. CARLOS RENATO PASSOS</p>
        <h1>{sectorName}</h1>
      </div>
      <div className="body">
        <div className="atually">
          <span>SENHA</span>
          <h2>{list[0].numero}</h2>
          <p>GUICHÊ {list[0].guiche}</p>
        </div>
        <div className="lasted">
          <h2>ÚLTIMAS SENHAS</h2>
          <div>
            <p className="senha">SENHA</p>
            <p className="guiche">GUICHÊ</p>
          </div>
          <div>
            <p className="senha">{list[1].numero}</p>
            <p className="guiche">{list[1].guiche}</p>
          </div>
          <div>
            <p className="senha">{list[2].numero}</p>
            <p className="guiche">{list[2].guiche}</p>
          </div>
          <div>
            <p className="senha">{list[3].numero}</p>
            <p className="guiche">{list[3].guiche}</p>
          </div>
        </div>
      </div>
   </Container>
  );
}

export default Panel;