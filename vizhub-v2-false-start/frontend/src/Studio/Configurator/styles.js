import styled from 'styled-components';
import { Flex, mono } from '../../styles';

export const Wrapper = styled.div`
  width: 250px;
`;

export const Header = styled(Flex)`
  padding: 10px;
  color: ${props => props.theme.foreground};
  background: #4d4d4d;
  font-size: 1.5em;
  align-items: center;
  cursor: pointer;
`;

export const HeaderIcon = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
`;

export const HeaderTitle = styled.div`
  flex: 1;
  text-align: center;
`;

export const File = styled.div`
  font-family: '${mono.family}';
  font-size: 1.4em;
  cursor: pointer;
  user-select: none;
`;

export const Widget = styled(Flex)`
  border-radius: 10px;
  background: black;
  margin-bottom: ${props => (props.isLast ? '0' : '10px')};
`;

export const WidgetTitle = styled.div`
  padding: 10px;
  flex: 2;
`;

export const WidgetValue = styled.div`
  flex: 1;
  background: ${props => props.fill};
  width: 100px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;
