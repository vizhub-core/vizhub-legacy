import styled from 'styled-components';
import { Clickable } from '../../../../../styles';

const sectionActiveColor = 'rgba(192, 192, 192, 0.22)';

export const Wrapper = styled(Clickable)`
  border-left: 5px solid
    ${props => (props.isActive ? 'transparent' : sectionActiveColor)};
  margin-bottom: 1px;
  padding: 5px 15px 5px 15px;
  background-color: ${props =>
    props.isActive ? sectionActiveColor : 'transparent'};
`;
