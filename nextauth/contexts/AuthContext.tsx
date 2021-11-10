import { createContext, ReactNode } from 'react';
import { api } from '../services/api';

type SignInCredentials = {
  email: string,
  password: string
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>,
  isAuthenticated: boolean,
};

type AuthProviderProps = {
  children: ReactNode
};

export const AuhtContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn(credentials: SignInCredentials) {
    try {
      const response = await api.post('/sessions', credentials);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuhtContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuhtContext.Provider>
  );
}