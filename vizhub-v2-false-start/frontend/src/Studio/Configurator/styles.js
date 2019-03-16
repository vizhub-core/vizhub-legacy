import styled from 'styled-components';
import { Flex, mono } from '../../styles';

export const Wrapper = styled.div`
  width: 250px;
  padding-left: 10px;
`;

export const Header = styled(Flex)`
  padding: 10px;
  color: ${props => props.theme.foreground};
  background: ${props => props.theme.configuratorHeaderBackground}
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

export const Item = styled.div`
  cursor: pointer;
  user-select: none;
  padding: 4px 0;
  text-decoration: ${props => (props.isActive ? 'underline' : 'none')};
`;

export const File = styled(Item)`
  font-family: '${mono.family}';
  font-size: ${mono.size};
  line-height: ${mono.lineHeight};
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
