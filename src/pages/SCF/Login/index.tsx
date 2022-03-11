import React, { useState } from 'react';

import { Form } from './styles';

import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const { signIn } = useAuth();
  
  async function handleLogin(): Promise<void> {
    try {
      await signIn({ login, password });
  
      history.push(`/scf/dashboard`);
    } catch (err) {
      console.log(err)
      toast.error('Erro ao Efetuar o Login!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  return (
    <>
      <ToastContainer />
      <Form>
        
        <div>
          <strong>Sign-In</strong>
          <p>Realize o Login</p>

          <div className="header">
            <label htmlFor="email">Login: *</label>
            <input 
              id="email" 
              value={login}
              onChange={(e): void => setLogin(e.target.value)}
              type="text" 
              placeholder="ÚSUARIO" 
              name="text"
              required
            />

            <label htmlFor="senha">Senha: *</label>
            <input 
              id="senha" 
              type="password" 
              value={password}
              onChange={(e): void => setPassword(e.target.value)}
              placeholder="****" 
              name="senha"
              required
            />
          </div>
          <div className="buttons">
            <div onClick={handleLogin}>Login</div>
          </div>
        </div>
      </Form> 
    </>
  );
}

export default Login;