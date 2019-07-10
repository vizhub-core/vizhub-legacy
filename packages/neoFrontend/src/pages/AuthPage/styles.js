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

export const Octocat = styled.img`
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const Terms = styled.div`
  margin-top: 22px;
  font-size: 10px;
`;
