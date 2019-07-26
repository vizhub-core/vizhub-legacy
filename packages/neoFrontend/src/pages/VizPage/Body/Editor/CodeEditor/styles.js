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

export const Content = styled.div`
  flex: 1;
  padding: 10px;
  font-family: ${props => props.theme.defaultCodingFontFamily};
`;

export const CodeEditorIcon = styled(Icon)`
  height: ${props => props.theme.editorEntryHeight}px;
  padding-right: ${props => (props.rightmost ? 8 : 5)}px;
  padding-left: ${props => (props.leftmost ? 8 : 5)}px;
`;
