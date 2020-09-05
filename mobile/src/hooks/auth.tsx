import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export interface User {
  id: number;
  name: string;
  email: string;
  lastname: string;
  whatsapp: string;
  bio: string;
  avatar: string;
}

interface SignINProps {
  email: string;
  password: string;
  remember: boolean;
}

interface Data {
  token: string;
  user: User;
}

interface AuthContextProps {
  signIn(credentials: SignINProps): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
  user: User;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<Data>({} as Data)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageUser() {
      const [token, user] = await AsyncStorage.multiGet([
        '@Proffy:Token',
        '@Proffy:User',
      ])

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`
        setData({token: token[1], user: JSON.parse(user[1])})
      }

      setLoading(false)
    }

    loadStorageUser()
  }, [])

  const signIn = useCallback(async ({email, password, remember}) => {
    const response = await api.post('sessions', {
      email, 
      password
    })

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Proffy:Token', token],
      ['@Proffy:User', JSON.stringify(user)]
    ])

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({
      token,
      user
    })
  }, [])

  const updateUser = useCallback(async (user: User) => {
    await AsyncStorage.setItem('@Proffy:User', JSON.stringify(user))

    setData({token: data.token, user})
  }, [data.token])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Proffy:Token', '@Proffy:User'])

    setData({} as Data)
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, user: data.user, updateUser, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function UseAuth(): AuthContextProps {
  const context = useContext(AuthContext)

  return context
}