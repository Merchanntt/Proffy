import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';

import Profile from '../pages/Profile';

import GiveClasses from '../pages/CreateClasses';
import SuccessCreateClass from '../pages/SuccessPages/CreateClass';

import ClassesTabNavigation from './ClassesTab';

const { Navigator, Screen} = createStackNavigator()

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false}}>

      <Screen name='Landing' component={Landing}/>

      <Screen name='Profile' component={Profile}/>

      <Screen name='GiveClasses' component={GiveClasses}/>
      <Screen name='SuccessCreateClass' component={SuccessCreateClass}/>

      <Screen name='ClassesList' component={ClassesTabNavigation}/>
    </Navigator>
  </NavigationContainer>
)

export default AppRoutes