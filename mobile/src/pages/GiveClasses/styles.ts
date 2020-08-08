import { StyleSheet } from 'react-native'

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257e5',
    justifyContent: "center",
    padding: 30
  },

  content: {
    flex: 1,
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180
  }, 

  description: {
    fontFamily: 'Poppins_400Regular',
    marginTop: 24,
    color: '#d4c2ff',
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 240
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: "space-between",
  },

  button: {
    marginVertical: 40,
    height: 58,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#04d361'
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 16
  },
})

export default styles