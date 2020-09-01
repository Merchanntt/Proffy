import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #E5E5E5;
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px;
`;


export const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4px;
`;

export const  CirclesContainer = styled.View`
  flex-direction: row;
`;

export const  Title = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-top: 32px;
`;

export const  TitleText = styled.Text`
  flex: 1;
  font-family: 'Poppins_600SemiBold';
  font-size: 32px;
  color: #32264D;
`;

export const TitleDescription = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 24px;
  color: #6A6180;
  margin-top: 16px;
  margin-bottom: 147px;
`;

export const Label = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 24px;
  color: #32264D;
  margin-bottom: 24px;
`;

