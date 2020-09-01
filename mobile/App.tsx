import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/Routes';
import {AppLoading} from 'expo'
import { AuthProvider } from './src/hooks/auth'

import {Archivo_400Regular, Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo'
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins'

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <>
      <StatusBar style='light'/>
      <AuthProvider>
        <Routes />
      </AuthProvider>    
      </>
    );
  }
}
