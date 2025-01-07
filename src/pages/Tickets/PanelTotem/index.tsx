import React, { useState } from 'react';
import { Container } from './styles';
import logoSaude from '../../../assets/logo2.png';
import api from '../../../services/api';
import { toast, ToastContainer } from 'react-toastify';

/*
* TOTEM
*/
const PanelTotem: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputToken, setInputToken] = useState('');
  const [token, setToken] = useState(() => {
    const tokenStoraged = localStorage.getItem('@panel-totem-token');
    if(!tokenStoraged) return null;

    return tokenStoraged;
  })

  function defineToken() {
    if(!inputToken) return;

    localStorage.setItem('@panel-totem-token', inputToken);
    setToken(inputToken);
  }

  const printTicket = (prioritary: boolean) => {
    setIsLoading(true);
    try {
      api.post('/totemCalls', { prioritary, token }).then().catch((err) => {
        toast.error(
          `${err}`
        )
      }); 
    } catch (err) {
      toast.error(
        `${err}`
      )
    }
    setIsLoading(false);
  }

  return (
    <>
      <ToastContainer />

      <Container>
        {!token && (
          <div>
            <h1>Digíte o token</h1>
            <input type="text" onChange={(e) => setInputToken(e.currentTarget.value)} />
            <button onClick={defineToken}>Confirmar</button>
          </div>
        )}
        {token && (
          <div>
            <img src={logoSaude} alt="Logo" />

            <h1>Retire sua senha</h1>
            <button 
              className='priority' 
              onClick={() => printTicket(true)}
              disabled={isLoading}
            >
              PRIORITÁRIO
            </button>
            <button 
              onClick={() => printTicket(false)}
              disabled={isLoading}
            >
              NORMAL
            </button>
          </div>
        )}
      </Container>
    </>
  );
}

export default PanelTotem;