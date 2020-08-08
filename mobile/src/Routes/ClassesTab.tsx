import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ClassesListPage from '../pages/ListClasses'
import FavoriteClassesPage from '../pages/FavoritesClasses'

const { Navigator, Screen } = createBottomTabNavigator()

const ClassesTabNavigation: React.FC = () => (
  <Navigator tabBarOptions= {{
    style: {
      elevation: 0,
      shadowOpacity: 0,
      height: Platform.OS === 'ios' ? 84 : 64,
    },
    tabStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    safeAreaInsets: {
      bottom: 0,
    },
    iconStyle: {
      flex: 0,
      width: 20,
      height:  Platform.OS === 'ios' ? 24 : 20,
    },
    labelStyle: {
      fontFamily: 'Archivo_700Bold',
      fontSize: 13,
      marginLeft: 16,
    },
    inactiveBackgroundColor: '#fafafc',
    activeBackgroundColor: '#ebebf5',
    inactiveTintColor: '#c1bccc',
    activeTintColor: '#32264d'
  }}>
    <Screen 
      name='ClassesListPage' 
      component={ClassesListPage} 
      options= {{
        tabBarLabel: 'Proffys',
        tabBarIcon: ({color, size, focused}) => (
          <Ionicons name='ios-easel' size={size} color={focused ? '#8257e5' : color}/>
        )
      }}
    />
    <Screen 
      name='FavoriteClassesPage' 
      component={FavoriteClassesPage} 
      options= {{
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({color, size, focused}) => (
          <Ionicons name='ios-heart' size={size} color={focused ? '#8257e5' : color}/>
        )
      }}
    />
  </Navigator>
) 

export default ClassesTabNavigation;