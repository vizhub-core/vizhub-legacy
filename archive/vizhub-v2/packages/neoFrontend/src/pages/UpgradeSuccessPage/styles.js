import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Large = styled.div`
  font-size: ${(props) => props.theme.text.large};
  margin-top: 150px;
  margin-bottom: 30px;
`;

export const Blurb = styled.div`
  margin-bottom: 30px;
`;
