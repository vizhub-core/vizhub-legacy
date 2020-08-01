import styled from 'styled-components';
import { Icon } from '../../../styles';

export const Wrapper = styled.div`
  height: ${(props) => props.theme.headHeight}px;
  transition: background-color 1s, color 1s;
  background-color: ${(props) => (props.warning ? '#f0353d' : '#ffffff')};
  color: ${(props) => (props.warning ? '#ffffff' : props.theme.dark)};
  box-shadow: ${(props) => props.theme.shadow};

  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.text.small};
`;

export const Left = styled.div`
  padding-left: 9px;
  display: flex;
  align-items: center;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Right = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeadIcon = styled(Icon)`
  height: ${(props) => props.theme.headHeight}px;
  width: 35px;
  margin-right: ${(props) => (props.rightmost ? 9 : 0)}px;
`;
