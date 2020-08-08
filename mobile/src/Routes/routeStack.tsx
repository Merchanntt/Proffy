import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import ClassesTabNavigation from './ClassesTab';

const { Navigator, Screen} = createStackNavigator()

const Routes: React.FC = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen name='Landing' component={Landing}/>
      <Screen name='GiveClasses' component={GiveClasses}/>
      <Screen name='ClassesList' component={ClassesTabNavigation}/>
    </Navigator>
  </NavigationContainer>
)

export default Routes