import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import api from '../services/api';

interface UserData {
  id: number;
  name: string;
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
  UserDataFormated: UserData;
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
    const UserDataFormated = localStorage.getItem('@Proffy:user');

    if (token && UserDataFormated) {
      return { token, UserDataFormated: JSON.parse(UserDataFormated) };
    }

    return {} as DataState;
  });

  const SignIn = useCallback(async ({ email, password, remember }) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, UserDataFormated } = response.data;

      if (!remember) {
        localStorage.setItem('@Proffy:token', token);
        localStorage.setItem('@Proffy:user', JSON.stringify(UserDataFormated));

        setTimeout(() => {
          localStorage.removeItem('@Proffy:token');
          localStorage.removeItem('@Proffy:user');
        }, 600000);
      }

      localStorage.setItem('@Proffy:token', token);
      localStorage.setItem('@Proffy:user', JSON.stringify(UserDataFormated));

      setData({ token, UserDataFormated });
    } catch (error) {
      console.log('User not Found');
    }
  }, []);

  const SignOut = useCallback(() => {
    localStorage.removeItem('@Proffy:token');
    localStorage.removeItem('@Proffy:user');

    setData({} as DataState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.UserDataFormated, SignIn, SignOut }}>
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
