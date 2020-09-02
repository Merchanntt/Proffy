import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#8257e5'
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#774DD6',
    padding: 30,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#6842C2'
  },

  topBar: {
    alignItems: "flex-start",
    justifyContent: 'center',
    marginTop: -40,
    marginBottom: 10
  },

  pageName: {
    fontFamily: 'Archivo_400Regular',
    color: '#D4C2FF',
    fontSize: 14,
  },

  rest: {
    padding: 30,
  },

  titleContainer: {
    flexDirection: 'row', 
    alignItems: "center", 
    justifyContent: 'space-between',
    width: 320
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40,
  },

  counter: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
    fontSize: 12,
  }
})

export default styles;