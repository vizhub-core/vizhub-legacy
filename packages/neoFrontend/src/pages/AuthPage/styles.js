import styled from 'styled-components';

export const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 713px;

  border-radius: 6px;
  box-shadow: ${props => props.theme.shadow};
  background-color: #ffffff;

  padding-top: 60px;
  padding-bottom: 60px;
`;

export const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 232px;
  height: 36px;
  border-radius: 6px;
  border: solid 1px #161514;

  font-size: 12px;
  color: ${props => props.theme.dark};
  text-decoration: none;

  :hover {
    background-color: ${props => props.theme.dark};
    color: white;
  }
`;

export const Octocat = styled.img`
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const Terms = styled.div`
  margin-top: 22px;
  font-size: 10px;
`;
