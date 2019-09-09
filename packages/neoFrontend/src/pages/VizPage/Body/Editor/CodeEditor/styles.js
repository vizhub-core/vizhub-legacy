import styled from 'styled-components';
import { Icon } from '../../styles';
import { EditorComponent } from '../styles';
import { backgroundColor } from '../themes/vizHub';

export const Wrapper = styled(EditorComponent)`
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  font-size: ${props => props.theme.defaultCodingFontSize};
  background-color: ${backgroundColor};
`;
export const CodeAreaWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

export const CodeEditorIcon = styled(Icon)`
  height: ${props => props.theme.editorEntryHeight + 1}px;
  padding-right: ${props => (props.rightmost ? 8 : 5)}px;
  padding-left: ${props => (props.leftmost ? 8 : 5)}px;
`;
