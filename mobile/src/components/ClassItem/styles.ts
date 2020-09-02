import { StyleSheet } from "react-native";
import AuthRoutes from "../../Routes/auth.route.Stack";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden'
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff'
  },

  PerfilInfo: {
    marginLeft: 16
  },

  name: {
    fontFamily: 'Archivo_700Bold',
    color: '#32264d',
    fontSize: 20,
  },

  subject: {
    fontFamily: 'Poppins_400Regular',
    color: '#6a6180',
    fontSize: 12,
    marginTop: 4
  },

  description: {
    marginHorizontal: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6a6180',
    marginBottom: 24
  },

  schedule: {
    padding: 20,
  },

  scheduleLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10
  },

  scheduleLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#9C98A6',
  },

  scheduleInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#FAFAFC',
    borderWidth: 1,
    borderColor: '#E6E6F0',
    borderRadius: 8,
    marginBottom: 8
  },

  scheduleText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 14,
    color: '#6A6180',
  },

  scheduleDayText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 14,
    color: '#6A6180',
    width: 60
  },

  scheduleArrowContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  scheduleArrow: {
    height: 2,
    width: 40,
    backgroundColor: '#E6E6F0'
  },

  footer: {
    backgroundColor: '#fafafc',
    padding: 24,
  },

  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",    
  },

  price: {
    fontFamily: 'Poppins_400Regular',
    color: '#6a6180',
    fontSize: 14,
  },

  priceValue: {
    fontFamily: 'Archivo_700Bold',
    color: '#8257e5',
    fontSize: 14
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16
  },

  favoriteButton: {
    backgroundColor: '#8257e5',
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },

  isFavorite: {
    backgroundColor: '#e33d3d'
  },

  contactButton: {
    backgroundColor: '#04d361',
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },

  contactButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginLeft: 10
  },

  as: {

  },

  
})

export default styles;