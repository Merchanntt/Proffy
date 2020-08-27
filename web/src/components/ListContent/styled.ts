import styled from 'styled-components';

export const ScheduleContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const ScheduleCard = styled.div`
  background: #fafafc;
  border-radius: 0.8rem;
  border: 0.1rem solid #e6e6f0;
  padding: 1rem;
  width: 12.2rem;
  height: 14rem;
`;

export const ScheduleInfo = styled.div`
  h1 {
    font: 700 1.6rem Archivo;
    color: #6A6180;
    margin-bottom: 2rem;
  }
  p {
    font: 400 1.2rem Poppins;
    color: #9C98A6;
    margin-bottom: 0.4rem
  }
`;
