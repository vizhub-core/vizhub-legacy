import styled from 'styled-components';
import { Item } from '../styles';

export const Wrapper = styled.div`
  color: ${props => props.theme.foreground};
  font-size: 16pt;
`;

export const Header = styled(Item)`
  margin-left: -3px;
`;

export const HeaderIcon = styled.div`
  width: 20px;
  height: 20px;
`;

export const HeaderTitle = styled.div`
  margin-left: 4px;
  user-select: none;
`;

export const Body = styled.div`
  padding-left: 21px;
  background: ${props => props.theme.sectionBodyBackground};
`;
