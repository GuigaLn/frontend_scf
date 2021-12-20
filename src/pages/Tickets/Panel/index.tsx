import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import socketIoClient from "socket.io-client";

import api from '../../../services/api';
import { END_POINT } from '../../../services/utils';

const Panel: React.FC = () => {
  const [sectorName, setSectorName] = useState("PAINEL");
  const [sectorId, setSectorId] = useState(0);
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
    
    if(sectorNameLocal !== undefined && sectorNameLocal !== null && sectorIdLocal !== undefined  && sectorIdLocal !== null) {
      setSectorName(sectorNameLocal!);
      setSectorId(Number(sectorIdLocal));
      loadingDate(Number(sectorIdLocal))
    } 
  }, []);

  async function loadingDate(sectorIdd: number) {
    await api.post('/loadingInitialWindow', {sectorId: sectorIdd}).then(response => {      
      if(response.data[0].numero.toString() !== lastNumber) {
        console.log(lastNumber)
        lastNumber = response.data[0].numero.toString();
        updateList(response.data);
        audioCall.play()
      }
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    loadingDate(sectorIdd);
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
   </Container>
  );
}

export default Panel;