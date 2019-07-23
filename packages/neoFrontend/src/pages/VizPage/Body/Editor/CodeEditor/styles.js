import styled from 'styled-components';
import { EditorComponent } from '../styles';

export const Wrapper = styled(EditorComponent)`
  position: relative;
  border-left: ${props =>
    props.showLeftBorder ? '1px solid rgba(255, 255, 255, 0.5)' : 'none'};
`;

// Z index here is so that the icons appear
// above the split pane resizer.
export const Icons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
`;
