import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#f0f0f7'
  },

  searchForm: {
    marginBottom: 8,
    marginTop: -20
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  inputBlock: {
    width: '48%'
  },

  button: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },

  itemlist : {
    marginTop: -40
  },

  
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: 310,
    height: 50,
    marginBottom: 20
  },

  border: {
    height: 1,
    width: 310,
    backgroundColor: '#9871F5',
    position: 'absolute',
    bottom: -10
  },

  filterText: {
    fontFamily: 'Archivo_400Regular',
    color: '#D4C2FF',
    fontSize: 16,
    marginLeft: 20
  }
})

export default styles;