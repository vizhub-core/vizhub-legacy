import styled from 'styled-components';

export const Box = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 713px;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadow};
  background-color: #ffffff;

  padding: 60px 15px 60px 15px;
  margin: 0 10px 0 10px;
`;

export const Octocat = styled.img`
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const Terms = styled.div`
  margin-top: 22px;
  font-size: 10px;
`;
export const SinginLink = styled.a`
  padding-top: 3%;
`;
