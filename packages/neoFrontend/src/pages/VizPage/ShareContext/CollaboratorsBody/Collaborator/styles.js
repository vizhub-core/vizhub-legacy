import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
`;

export const LoadingText = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.lightText};
`;
