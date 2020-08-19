import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import api from '../services/api';

interface UserData {
  id: number;
  name: string;
  email: string;
  lastname: string;
  avatar?: string;
  whatsapp?: string;
  bio?: string;
}

interface SignInProps {
  email: string;
  password: string;
  remember: boolean;
}

interface DataState {
  token: string;
  user: UserData;
}

interface AuthContextProvider {
  user: UserData;
  SignIn(credentials: SignInProps): Promise<void>;
  SignOut(): void;
}

const AuthContext = createContext<AuthContextProvider>({} as AuthContextProvider);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DataState>(() => {
    const token = localStorage.getItem('@Proffy:token');
    const user = localStorage.getItem('@Proffy:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as DataState;
  });

  const SignIn = useCallback(async ({ email, password, remember }) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (remember) {
        localStorage.setItem('@Proffy:token', token);
        localStorage.setItem('@Proffy:user', JSON.stringify(user));
      }

      sessionStorage.setItem('@Proffy:token', token);
      sessionStorage.setItem('@Proffy:user', JSON.stringify(user));

      setData({ token, user });
    } catch (error) {
      console.log('User not Found');
    }
  }, []);

  const SignOut = useCallback(() => {
    localStorage.removeItem('@Proffy:token');
    localStorage.removeItem('@Proffy:user');

    sessionStorage.removeItem('@Proffy:token');
    sessionStorage.removeItem('@Proffy:user');

    setData({} as DataState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth():AuthContextProvider {
  const context = useContext(AuthContext);

  if (!context) {
    console.log('Provider mus be used in a ContextProvider');
  }

  return context;
}
