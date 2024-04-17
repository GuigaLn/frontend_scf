import React, { useState } from 'react';
import api from '../../services/api';

import Clock from "./Clock";
import { Form } from './styles';

interface responsedInterface {
  title: string,
  msg: string,
  name: string
}

const Ponto: React.FC = () => {
  const [tokenPontoInput, setTokenPontoInput] = useState('');
  const [tokenPontoStorage, setTokenPontoStorage] = useState(() => {
    const tokenPontoLocal = localStorage.getItem('@ScfTokenPonto');
    if(tokenPontoLocal) return tokenPontoLocal.toString();

    return null;
  });
  const [ isLoading, setIsLoading ] = useState(false);
  const [ idEmployee, setIdEmployee ] = useState('');

  const [ responsed, setResponsed] = useState<responsedInterface>({title: 'Default', msg: 'Default', name: 'Default'});
  const [ isModal, setIsModal ] = useState(false);


  function handleSubmit(text: any = {}) {
    setIsLoading(true);
    if(idEmployee !== '') {
      try {
        api.post(`/time`, {registration: idEmployee}, { headers: { access_token: tokenPontoStorage } }).then(async response => {
            if(response.data.statusCode === 200) {
              setResponsed({ title: 'SUCESSO', msg: `${response.data.msg}`, name: `${response.data.name}` });
              setIsModal(true);
            } else {
              setResponsed({ title: 'ERROR', msg: `${response.data.msg}`, name: `${response.data.name}` });
              setIsModal(true);
            }
            setIsLoading(false);
            setIdEmployee('');
            setTimeout(() => {
              setIsModal(false)
            }, 3000);
          }).catch((err) => {
            if(err?.response?.status === 401) {
              alert("TOKEN DE PONTO INVÁLIDO");
              localStorage.removeItem('@ScfTokenPonto');
              setTokenPontoStorage(null);
              return;
            }
            alert("ERRO VERIFIQUE SEU ID");
            setIsLoading(false);
          }); 
      } catch(err: any) {
        alert("ERRO VERIFIQUE SEU ID");
        setIsLoading(false);
      }
    } else {
      alert("ID NÃO PODE SER VAZIO");
      setIsLoading(false);
    }
  }

  const submitPontoStorage = () => {
    if(!tokenPontoInput) return;
    localStorage.setItem('@ScfTokenPonto', tokenPontoInput);

    setTokenPontoStorage(tokenPontoInput);
  }

  if(!tokenPontoStorage) {
    return (
      <div>
        <input 
          value={tokenPontoInput}
          onChange={(e): void => setTokenPontoInput(e.target.value)}
          type="text" 
        />

        <button onClick={submitPontoStorage}>Confirmar</button>
      </div>
    )
  }

  return (
    <>
      {isModal ? 
        <div style={{ 
          position: 'absolute', height: '100vh', width: '100vw', backgroundColor: responsed.title === 'SUCESSO' ? '#228b22' : '#b4362c' ,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center'
          }}>
        <h1 style={{ color: '#FFF', marginBottom: 20, fontSize: '4rem' }}>
          {responsed.title}
        </h1>
        <p style={{ color: '#FFF', marginBottom: 20, fontSize: '2rem' }}>{responsed.name}</p>
        <p style={{ color: '#FFF', marginBottom: 20, fontSize: '2rem' }}>{responsed.msg}</p>
      </div> : <></>
      }
      <Form>
        <div>
          <Clock />

          <div className="header" style={{ padding: 40 }}>
            <label htmlFor="email">DIGITE SEU ID: *</label>
            <input 
              id="number" 
              value={idEmployee}
              onChange={(e): void => setIdEmployee(e.target.value)}
              type="number" 
              name="number"
              required
            />
          </div>
          <div className="buttons">
            <div onClick={handleSubmit}>CADASTRAR BATIDA</div>
          </div>
        </div>
      </Form> 
    </>
  );
}

export default Ponto;