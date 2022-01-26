import React, { useCallback, useEffect, useState } from 'react';
import { Container, Modal } from './styles';
import socketIoClient from "socket.io-client";

import api from '../../../services/api';
import { END_POINT } from '../../../services/utils';

/*
* FALTA RECEBER AS SENHAS ATRAVÉS DO SOCKET E ATUALIZAR O PAINEL
*/
const Panel: React.FC = () => {
  const [sectorName, setSectorName] = useState("PAINEL");
  const [sectorId, setSectorId] = useState(0);
  const [modalError, setModalError] = useState(false);
  const audioCall = new Audio('/sound.mp3');
  var lastNumber = "0";
 
  /*
  * AQUI FICA APENAS UM DEFAULT PARA CARREGAR
  */
  const defaultList = [
    {id: 0, numero: '-', guiche: '-'},
    {id: 0, numero: '-', guiche: '-'},
    {id: 0, numero: '-', guiche: '-'},
    {id: 0, numero: '-', guiche: '-'}
  ]

  const [list, updateList] = useState(defaultList);

  useEffect(() => {
    //new Audio('/sound.mp3').play();
    Notification.requestPermission();
    var sectorNameLocal = localStorage.getItem("@panel-ticket/sectorName");
    var sectorIdLocal = localStorage.getItem("@panel-ticket/sectorWindow");
    
    /* VERIFICA SE EXISTE SECTOR ID DEFINIDO */
    if(sectorIdLocal && !modalError) {
      /* INICIA UM END_POIN PARA REALIZAR AS CHAMADAS DO PAINEL */
      const socket = socketIoClient(END_POINT, { extraHeaders: { sectorid: sectorIdLocal }});

      socket.on('error', (error) => {
        setModalError(true);
        socket.disconnect();
        document.getElementById("errorId")!.innerHTML="Error ID: " + error;
      });
      
      socket.on('sucess', (sucess) => {
        console.log(sucess);
        /* CASO CONECTE SETA AS VARIAVEIS LOCAIS E CHAMA UM LOADING INICIAL (PUXAR ULTIMAS SENHAS) */
        if(sectorNameLocal !== undefined && sectorNameLocal !== null && sectorIdLocal !== undefined  && sectorIdLocal !== null) {
          setSectorName(sectorNameLocal!);
          setSectorId(Number(sectorIdLocal));
          loadingDate(Number(sectorIdLocal))
        } 
      });

      socket.on('disconnect', () => {
        /* SE POR ALGUM MOTIVO DESCONECTAR, ELE CHAMA UM MODAL DE ATUALIZAÇÃO DE PAGINA */
        setModalError(true);
        socket.disconnect();
        document.getElementById("errorId")!.innerHTML="Error ID: Client Disconnected";
      });
    }
  }, []);

  async function loadingDate(sectorIdd: number) {
    /* BUSCA NA API AS ULTIMAS SENHAS */
    await api.post('/loadingInitialWindow', {sectorId: sectorIdd}).then(response => {      
      if(response.data[0].numero.toString() !== lastNumber) {
        lastNumber = response.data[0].numero.toString();
        updateList(response.data);
        audioCall.play()
      }
    });
  }

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
          <h2>ULTIMAS SENHAS</h2>
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

      {modalError ?
      <Modal id="modalError">
        <div>
          <h1>ERRO AO SE COMUNICAR COM O SERVIDOR!</h1>
          <p>CLIQUE EM ATUALIZAR, CASO NÃO FUNCIONE VERIFIQUE SE NÃO EXISTE NENHUMA TV USANDO O MESMO SETOR!</p>
          <p className='errorId' id="errorId"></p>
          <button onClick={() => window.location.reload()}>RECARREGAR</button>
        </div>
      </Modal>
      : <></>}
   </Container>
  );
}

export default Panel;