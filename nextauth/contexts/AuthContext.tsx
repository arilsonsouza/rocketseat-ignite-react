import Router from 'next/router';
import { setCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';
import { api } from '../services/api';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string,
  password: string
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>,
  user?: User,
  isAuthenticated: boolean,
};

type AuthProviderProps = {
  children: ReactNode
};

export const AuhtContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn(credentials: SignInCredentials) {
    try {
      const { data } = await api.post('/sessions', credentials);
      const { permissions, roles, token, refreshToken } = data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 + 60 * 24 * 30, // 30 days
        path: '/'
      });

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 + 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({ email: credentials.email, permissions, roles });
      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuhtContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuhtContext.Provider>
  );
}