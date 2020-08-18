import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: header;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #774DD6;
    width: 40px;
    height: 40px;
    border: 0;
    cursor: pointer;
    border-radius: 8px;

    color: #D4C2FF;

    transition: opacity 0.3s;
    :hover {
      opacity: 0.7;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  a {
    font-family: 1.4rem Archivo;
    color: #D4C2FF;
    margin-left: 10px;
    text-decoration: none;

    transition: opacity 0.3s;
    :hover {
      opacity: 0.7
    }
  }
`;
