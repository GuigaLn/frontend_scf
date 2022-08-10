import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';
import callCenterApi from '../services/callCenterApi';

interface InterfaceUser {
  id: number;
  login: string;
  userPermissions: Array<{ permisionid: number }>
  id_unidade_de_saude: number
}

interface SignInCredentials {
  login: string;
  password: string;
  mobile?: boolean;
}

interface AuthState {
  token: string;
  user: InterfaceUser;
  mobile: boolean;
}

interface AuthContextState {
  user: InterfaceUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  mobile: boolean;
}


export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ScfUserAuth:token');
    const user = localStorage.getItem('@ScfUserAuth:user');
    const mobile = localStorage.getItem('@ScfUserAuth:mobile');

  

    if ( token && user ) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      callCenterApi.defaults.headers.authorization = `Bearer ${token}`;
      
      return { token, user: JSON.parse(user), mobile: mobile ? true : false };
    }

    return {mobile: mobile ? true : false} as AuthState;
  });
  
  const signIn = useCallback(async({ login, password, mobile }) => {

    const response = await api.post('login', {
      login,
      password
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;
    callCenterApi.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@ScfUserAuth:token', token);
    localStorage.setItem('@ScfUserAuth:user', JSON.stringify(user));

    if(mobile) {
      localStorage.setItem('@ScfUserAuth:mobile', 'true');
    }

    setData({ token, user, mobile: mobile ? true : false });
  }, []);
  
  const signOut = useCallback(() => {
    localStorage.removeItem('@ScfUserAuth:token');
    localStorage.removeItem('@ScfUserAuth:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, mobile: data.mobile, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth Error!');
  }

  return context;
}