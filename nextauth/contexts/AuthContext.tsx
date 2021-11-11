import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/apiClient';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user?: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export const AuhtContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();
    if (token) {
      (async () => {
        try {
          const { data } = await api.get('/me');
          const { email, permissions, roles } = data;
          setUser({ email, permissions, roles });
        } catch (error) {
          signOut();
        }

      })();
    }
  }, []);

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
    <AuhtContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuhtContext.Provider>
  );
}