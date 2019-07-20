import styled from 'styled-components';
import { Clickable } from '../../../../../styles';

const sectionActiveColor = 'rgba(192, 192, 192, 0.22)';

export const Wrapper = styled.div`
  border-left: 5px solid
    ${props => (props.isActive ? 'transparent' : sectionActiveColor)};
  margin-bottom: 1px;
  padding: 5px 15px 5px 15px;
  background-color: ${props =>
    props.isActive ? sectionActiveColor : 'transparent'};
  position: relative;
`;

export const ClickableOverlay = styled(Clickable)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
