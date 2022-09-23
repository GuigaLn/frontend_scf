import { gql, useSubscription } from '@apollo/react-hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import LogoCM from './logoCM.png';

import { FiPlay } from 'react-icons/fi';
import { ButtonInteraction, Container } from './styles';

/*
* FALTA RECEBER AS SENHAS ATRAVÉS DO SOCKET E ATUALIZAR O PAINEL
*/
const Panel: React.FC = () => {
  const [sectorName, setSectorName] = useState("FARMACIA");
  const audioCall = useMemo(() => new Audio('/sound.mp3'), []);
  const history = useHistory();
  const [interaction, setInteraction] = useState(false);

  const NOTIFY_NEW_PUBLIC_TODOS = gql`
    subscription MySubscription {
      chamados(where: {setor_senha: {nome: {_eq: "${localStorage.getItem("@panel-ticket/sectorName")}"}}}, limit: 4, order_by: {id: desc}) {
        id
        numero
        setor_id
        guiche
        setor_senha {
          nome
        }
      }
    }
  `;
  
  const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);

  useEffect(() => {
    if(interaction) {
      var sectorNameLocal = localStorage.getItem("@panel-ticket/sectorName");

      if(sectorNameLocal === "FARMACIA" || sectorNameLocal === "CONSULTA" || sectorNameLocal === "EXAME") {
        setSectorName(sectorNameLocal)
      } else {
        history.push("/panelconfig");
      }

      audioCall.play();
    }
  }, [audioCall, history, interaction]);

  useEffect(() => {
    if(interaction) {
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
    }
  }, [audioCall, data, error, interaction]);

  /* EVITAR ERROS */
  const defaultList = [
    {id: 0, numero: '-', guiche: '-', setor_senha: { nome: ['-'] }},
    {id: 0, numero: '-', guiche: '-', setor_senha: { nome: ['-'] }},
    {id: 0, numero: '-', guiche: '-', setor_senha: { nome: ['-'] }},
    {id: 0, numero: '-', guiche: '-', setor_senha: { nome: ['-'] }}
  ]

  const [list, updateList] = useState(defaultList);

  return (
    <Container>
      { !interaction && 
        <ButtonInteraction onClick={() => setInteraction(true)}>
          <span>Para iniciar o painel clique no botão "OK" do controle</span>
          <strong>INICIAR <FiPlay /></strong>
        </ButtonInteraction> 
      }
      <div className="header" id="tex">
        <div className="name-sector">
          <h1>{list[0].setor_senha.nome}</h1>
          <img src={LogoCM} alt="Logo Cruz Machado Para Todos" />
        </div>

        <div className="atually">
          <h2>{list[0].numero}</h2>
          <p>GUICHÊ <br /> {list[0].guiche}</p>
        </div>
      </div>
      <div className="body">
        <div className="lasted">
          <div>
            <p className="senha">{list[1].numero}</p>
            <p className="guiche">Guichê: {list[1].guiche}</p>
          </div>
          <div>
            <p className="senha">{list[2].numero}</p>
            <p className="guiche">Guichê: {list[2].guiche}</p>
          </div>
          <div>
            <p className="senha">{list[3].numero}</p>
            <p className="guiche">Guichê: {list[3].guiche}</p>
          </div>
        </div>
      </div>
   </Container>
  );
}

export default Panel;