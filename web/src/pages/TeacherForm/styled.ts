import styled from 'styled-components';

export const InfoInput = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
`;

export const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  p {
    color: #32264D;
    font: 700 2rem Archivo;
    line-height: 2.5rem;
    margin-left: 2rem;
  }
`;

export const SubjectInput = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1.6rem;
  align-items: center;
`;
