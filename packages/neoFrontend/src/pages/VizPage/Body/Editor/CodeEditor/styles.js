import styled from 'styled-components';
import { Icon } from '../../styles';
import { EditorComponent } from '../styles';

// TODO split pane resize logic
// width: 500px;
export const Wrapper = styled(EditorComponent)`
  flex: 1;
  position: relative;
  border-left: ${props =>
    props.showLeftBorder ? '1px solid rgba(255, 255, 255, 0.5)' : 'none'};
`;

export const CodeEditorIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 10px 10px 10px;
`;
