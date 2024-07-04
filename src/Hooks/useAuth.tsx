import { createContext, useCallback, useState, useContext } from 'react';

import api from '../Services/api';
import { IUser } from '../Interface/User';

interface SignInCredentials {
  email: string;
  password: string;
  passwordConfirmation: string
}

interface AuthContextState {
  user: IUser
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthStateRequest {
  token: {
    type: string;
    token: string;
    expires_at: string;
  };
  user: IUser
}

interface AuthState {
  token: string;
  expires_at: string | null;
  user: IUser
}

interface Props {
  children: JSX.Element | JSX.Element;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: Props) => {
  const keyStorage = 'auth';
  const keyStorageToken = 'auth:token';

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(keyStorageToken);
    const user = localStorage.getItem(keyStorage);
    const expires_at = localStorage.getItem('auth:expires_at');

    if (token && user) {
      return { token, user: JSON.parse(user), expires_at };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, passwordConfirmation  }: SignInCredentials) => {
    const response = await api.post<AuthStateRequest>('auth/login', {
      email,
      password,
      password_confirmation: passwordConfirmation
    });
    const {
      token: { token, expires_at },
      user,
    } = response.data;

    if (user) localStorage.setItem(keyStorageToken, token);
    if (expires_at) localStorage.setItem('auth:expires_at', expires_at);
    localStorage.setItem(keyStorage, JSON.stringify(user));

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setData({ token, user, expires_at });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(keyStorageToken);
    localStorage.removeItem(keyStorage);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('insira o authprovider ao redor do seu elemento');
  }
  return context;
}

export { AuthProvider, useAuth };
