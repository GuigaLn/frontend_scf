import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import callCenterApi from '../services/callCenterApi';

interface InterfaceUser {
  id: number;
  login: string;
  userPermissions: Array<{ permisao_id: number }>
}

interface SignInCredentials {
  login: string;
  password: string;
}

interface AuthState {
  token: string;
  user: InterfaceUser;
}

interface AuthContextState {
  user: InterfaceUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}


export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ScfUserAuth:token');
    const user = localStorage.getItem('@ScfUserAuth:user');

    if ( token && user ) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      callCenterApi.defaults.headers.authorization = `Bearer ${token}`;
      
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  
  const signIn = useCallback(async({ login, password }) => {

    const response = await api.post('login', {
      login,
      password
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;
    callCenterApi.defaults.headers.authorization = `Bearer ${token}`;
    console.log(token);

    localStorage.setItem('@ScfUserAuth:token', token);
    localStorage.setItem('@ScfUserAuth:user', JSON.stringify(user));

    setData({ token, user });
  }, []);
  
  const signOut = useCallback(() => {
    localStorage.removeItem('@ScfUserAuth:token');
    localStorage.removeItem('@ScfUserAuth:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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