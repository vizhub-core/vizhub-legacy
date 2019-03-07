import styled from 'styled-components';
import { Flex } from '../../../styles';

export const Wrapper = styled.div`
  color: ${props => props.theme.foreground};
  font-size: 1.2em;
`;

export const Header = styled(Flex)`
  padding: 10px;
  background: #363636;
  align-items: center;
  cursor: pointer;
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
  padding: 10px;
  background: #222222;
`;
