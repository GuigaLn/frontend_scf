import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container } from './styles';

import api from '../../../services/api';

const SecondConfig: React.FC = () => {
  const history = useHistory();
  const [lastTicket, setLastTicket] = useState(' ')
  const [sectorId, setSectorId] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [numberWindow, setNumberWindow] = useState('');
  const [delayCall, setDelayCall] = useState(false);

  useEffect(() => {
    var sWl = localStorage.getItem("@panel-ticket/sectorWindow");
    var nWl = localStorage.getItem("@panel-ticket/numberWindow");
    var sWn = localStorage.getItem("@panel-ticket/sectorName");

    if(sWl === null || nWl === null ||sWn === null) {
      history.push('/');
    } else {
      setSectorId(sWl);
      setNumberWindow(nWl);
      setSectorName(sWn);
    }
  });

  function handdleCall() {
    setDelayCall(true);
    try {
      api.post('/TicketWindowController', {sectorId: sectorId, ticketWindow: numberWindow}).then(response => {
        setLastTicket(response.data.numberCall);
        console.log(response.data.numberCall);
        activeCall();
      }).catch((err) => {
        console.log(err);
        activeCall();
      }); 
    } catch (err) {
      console.log(err);
      activeCall();
    }
  }

  function activeCall() {
    setTimeout(() => {
      setDelayCall(false);
    }, 5000)
  }

  return (
    <Container>
      <div>
        <h1>{sectorName} - GUICHÊ {numberWindow}</h1>
        <button onClick={handdleCall} style={{ opacity: delayCall ? '0' : '1' }} disabled={delayCall}>CHAMAR</button>
        <h2>SENHA: {lastTicket}</h2>
      </div>
    </Container>
  );
}

export default SecondConfig;