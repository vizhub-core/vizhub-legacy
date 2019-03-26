import styled from 'styled-components';
import { Flex } from '../../styles';

export const Wrapper = styled.div`
  color: ${props => props.theme.container.color};
  background: ${props => props.theme.container.background};
  width: 250px;
  padding-left: 10px;
`;

export const Header = styled(Flex)`
  padding: 10px;
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

export const Item = styled(Flex)`
  cursor: pointer;
  user-select: none;
  padding: 4px 0;
  text-decoration: ${props => (props.isActive ? 'underline' : 'none')};
  align-items: center;
`;
export const ItemIcon = styled.div`
  width: 16px;
  margin: 0 7px -2px 0;
`;

export const File = styled(Item)`
  font-family: '${props => props.theme.font.family}';
  font-size: ${props => props.theme.font.size};
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
