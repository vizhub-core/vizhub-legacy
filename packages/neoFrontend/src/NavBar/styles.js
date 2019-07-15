import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignIn = styled.div`
  color: ${props => props.theme.attentionGrabber};
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin-top: 2px;
`;

export const LogoLink = styled(Link)`
  line-height: 0;
  color: currentcolor;
`;
