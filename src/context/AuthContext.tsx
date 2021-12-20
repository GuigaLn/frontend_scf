import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface SignInCredentials {
  login: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextState {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}


export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@scf_system:token');
    const user =localStorage.getItem('@scf_system:user');

    if ( token && user ) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  
  const signIn = useCallback(async({ login, password }) => {
    localStorage.setItem('@scf_system:token', 'token');
    localStorage.setItem('@scf_system:user', JSON.stringify('user'));

    const response = await api.post('login', {
      login,
      password
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@scf_system:token', token);
    localStorage.setItem('@scf_system:user', JSON.stringify(user));

    setData({ token, user });
  }, []);
  
  const signOut = useCallback(() => {
    localStorage.removeItem('@scf_system:token');
    localStorage.removeItem('@scf_system:user');

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