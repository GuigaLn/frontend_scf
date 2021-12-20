import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyle from './styles/global';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <> 
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <GlobalStyle />
      </AuthProvider>
    </>
  );
}

export default App;
