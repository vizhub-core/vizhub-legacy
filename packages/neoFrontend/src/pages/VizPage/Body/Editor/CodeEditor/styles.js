import styled from 'styled-components';
import { Icon } from '../../styles';
import { EditorComponent } from '../styles';

export const Wrapper = styled(EditorComponent)`
  border-left: ${props =>
    props.showLeftBorder ? props.theme.editorBorder : 'none'};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  box-shadow: ${props => props.theme.shadow};
`;
//border-bottom: ${props => props.theme.editorBorder};
//background-color: ${props => props.theme.editorSectionActiveColor};
//text-decoration: underline;

// Z index here is so that the icons appear
// above the split pane resizer.
export const Icons = styled.div`
  display: flex;
`;

export const CodeAreaPre = styled.pre`
  flex: 1;
  padding: 10px;
  margin: 0;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.93;
`;

export const CodeAreaTextarea = styled.textarea`
  flex: 1;
  padding: 10px;
  margin: 0;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.93;
  background-color: transparent;
  color: #ffffff;
  border: none;
  resize: none;
  outline: none;
`;

export const Content = CodeAreaPre;

export const CodeEditorIcon = styled(Icon)`
  height: ${props => props.theme.editorEntryHeight}px;
  padding-right: ${props => (props.rightmost ? 8 : 5)}px;
  padding-left: ${props => (props.leftmost ? 8 : 5)}px;
`;
