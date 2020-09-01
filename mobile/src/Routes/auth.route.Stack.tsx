import React, { useEffect, useState } from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import OnBoarding from '../pages/onBoarding/flatlist';

import LogIn from '../pages/LogIn';

import CreateAccountName from '../pages/CreateAccount/UserName';
import CreateAccountCredentials from '../pages/CreateAccount/Credentials';
import SuccessCreateUser from '../pages/SuccessPages/CreateUser';

import ForgotPassword from '../pages/ForgotPassword';
import SuccessSendMail from '../pages/SuccessPages/SendMail';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

const { Navigator, Screen} = createStackNavigator()

const AuthRoutes: React.FC = () => {
  const [firstLogOn, setFirstLogOn] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function firstTime() {
      const first = await AsyncStorage.getItem('@Proffy:first')

      if(first === 'false') {
        setFirstLogOn(false)
      }
      setLoading(false)
    }
    firstTime()
  }, [])

  useEffect(() => {
    async function firstTime() {
      await AsyncStorage.setItem('@Proffy:first', 'false')
    }
    firstTime()
  }, [])

  if (loading) {
    return (
      <AppLoading />
    )
  }
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false}}>
        {firstLogOn && <Screen name='OnBoarding' component={OnBoarding} /> }

        <Screen name='LogIn' component={LogIn}/>

        <Screen name='CreateAccount-Name' component={CreateAccountName} />
        <Screen name='CreateAccount-Credentials' component={CreateAccountCredentials} />
        <Screen name='SuccessCreateUser' component={SuccessCreateUser} />

        <Screen name='ForgotPassword' component={ForgotPassword}/>
        <Screen name='SuccessSendMail' component={SuccessSendMail} />

      </Navigator>
    </NavigationContainer>
)}

export default AuthRoutes