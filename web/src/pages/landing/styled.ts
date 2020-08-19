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

export const UnderPage = styled.div`
  display: flex;
  grid-area: buttons;
  justify-content: space-between;
  align-items: center;
  background-color: #E5E5E5;
  padding: 0 20px;
  border-radius: 8px;

  div {

    h2 {
      font-size: 20px;
      color: #6A6180;
      font-weight: 500;
    }

    h1 {
      font-size: 20px;
      font-weight: bold;
      color: #6A6180;
    }
  }

  span {
    position: relative;
    margin-right: 24px;
    color: #9C98A6;

    img {
    position: absolute;
    right: -4px;
    bottom: 3px;
    }
  }
`;
