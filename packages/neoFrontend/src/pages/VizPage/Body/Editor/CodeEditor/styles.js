import styled from 'styled-components';
import { EditorComponent } from '../styles';

// TODO split pane resize logic
// width: 500px;
export const Wrapper = styled(EditorComponent)`
  flex: 1;
  position: relative;
  border-left: ${props =>
    props.showLeftBorder ? '1px solid rgba(255, 255, 255, 0.5)' : 'none'};
`;

export const Icons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
`;
