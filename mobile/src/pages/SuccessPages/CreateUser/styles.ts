import { StyleSheet } from 'react-native'

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257e5',
    justifyContent: "center",
    padding: 30,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 32,
    lineHeight: 37,
    marginTop: 24,
    textAlign: 'center'
  }, 

  description: {
    fontFamily: 'Poppins_400Regular',
    marginTop: 24,
    color: '#d4c2ff',
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 240,
    textAlign: 'center'
  },

  button: {
    width: 294,
    marginTop: 200,
  },
})

export default styles