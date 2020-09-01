import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import Study from './study'
import Classes from './giveClasses'
import { View } from 'react-native'

const OnBoardingFlatList: React.FC = () => {
  const width = 375  
  
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#8257e5'
    }}>
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    >
      <View style={{width}}>
        
      <Study />
      </View>
      <View style={{width}}>
        
      <Classes />
        </View>
    </ScrollView>
      </View>
  )
}

export default OnBoardingFlatList