import styled from 'styled-components/native'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';


export const Container = styled.View`
  flex: 1;
  background-color: #E5E5E5;
`;

export const InfoContainer = styled.ImageBackground`
  justify-content: center;
  align-items: center;
  margin-top: -50px;
  position: relative;
`;


export const  Avatar = styled.Image`
  height: 140px;
  width: 140px;
  border-radius: 70px;
  background-color: #774DD6;
`;

export const  SendPhotoButton = styled(RectButton)`
  position: absolute;
  right: 0;
  bottom: 10px;
  background-color: #04D361;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const  UserName = styled.Text`
  width: 300px;
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  margin-top: 24px;
`;

export const MainForm = styled.ScrollView`
  flex: 1;
  margin-top: -40px;
`;

export const Session = styled.View`
  background-color: #fff;
  border-radius: 8px;
`;

export const SessionTitleContainer = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #E6E6F0;
  align-items: center;
  justify-content: space-between;
`;

export const SessionTitle = styled.Text`
  margin-bottom: 8px;
  color: #32264D;
  font-family: 'Archivo_400Regular';
  font-size: 20px;
`;

export const AddHourButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const AddHourButtonText = styled.Text`
  font-family: 'Archivo_400Regular';
  color: #8257E5;
  font-size: 14px;
`;

export const PickerContainer = styled.View`
  background-color: #FAFAFC;
  border-width: 1px; 
  border-color: #E6E6F0;
  border-radius: 8px;
  margin-top: 20px;
  height: 64px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const PickerTimeContainer = styled.View`
  width: 48%;
  background-color: #FAFAFC;
  border-width: 1px; 
  border-color: #E6E6F0;
  border-radius: 8px;
  margin-top: 20px;
  height: 64px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const PickerGroupContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Step = styled.View`
  width: 100%;
  height: 30px;
  border-bottom-width: 1px;
  border-bottom-color: #E6E6F0;
  margin-bottom: 4px;
`;

export const DeleteButton = styled(BorderlessButton)`
  position: absolute;
  background-color: #fff;
  width: 120px;
  right: 30%;
  left: 30%;
  bottom: -3px;
  align-items: center;
`;

export const DeleteButtonText = styled.Text`
  font-family: 'Archivo_400Regular';
  font-size: 14px;
  color: #E33D3D;
`;

export const Footer = styled.View`
  padding: 25px;
  height: 105px;
  background-color: #FAFAFC;
  margin-top: 20px;
  border-top-width: 1px;
  border-top-color: #E6E6F0;
  justify-content: flex-end;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

