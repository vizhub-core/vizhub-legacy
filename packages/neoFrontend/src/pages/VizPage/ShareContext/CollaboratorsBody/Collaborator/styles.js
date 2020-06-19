import styled from 'styled-components';

export const Wrapper = styled.div`
  height: ${(props) => props.theme.buttonHeight};
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.isLast ? 0 : 16)}px;
`;

export const UserWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.lightBorder};
  border-radius: 4px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
`;

export const LoadingText = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.lightText};
`;
