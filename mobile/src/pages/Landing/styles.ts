import { StyleSheet } from 'react-native'

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: "center",
  },

  topContent: {
    marginTop: 15,
    backgroundColor: '#8257e5',
    padding: 30,
  },

  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center"
  },

  userName: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
    fontSize: 12,
    lineHeight: 22,
    marginLeft: 12,
    maxWidth: 200
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },

  buttonLogOff: {
    backgroundColor: '#774DD6',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  banner: {
    width: '100%',
    resizeMode: 'contain'
  },

  bottomContent: {
    padding: 30
  },

  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,
  }, 

  description: {
    fontFamily: 'Poppins_600SemiBold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: "space-between",
  },

  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between"
  },

  buttonPrimary: {
    backgroundColor: '#9871f5'
  },

  buttonSecondary: {
    backgroundColor: '#04d361'
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 20
  },

  connections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,
    maxHeight: 140,
    marginTop: 20,
  },
})

export default styles