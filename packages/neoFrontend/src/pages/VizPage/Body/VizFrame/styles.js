import styled from 'styled-components';
import { Z_ABOVE, Z_BELOW } from '../../../../styles';
import { Icon } from '../styles';

export const Wrapper = styled.div`
  background-color: #ffffff;
  border-radius: 0 0 3px 3px;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  z-index: ${Z_BELOW};
  box-shadow: ${props => props.theme.shadowLight};
  height: ${props => props.height}px;
`;

export const Footer = styled.div`
  z-index: ${Z_ABOVE};
  box-shadow: ${props => props.theme.shadow};
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const FooterIcon = styled(Icon)`
  width: auto;
  height: 40px;
  padding-right: ${props => (props.rightmost ? '10' : '7')}px;
  padding-left: ${props => (props.leftmost ? '10' : '7')}px;
  margin-right: 0;
`;
