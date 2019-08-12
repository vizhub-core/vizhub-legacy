import styled from 'styled-components';
import { EditorComponent } from '../styles';
import { backgroundColor } from '../themes/vizHub';

export const Wrapper = styled(EditorComponent)`
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  font-size: ${props => props.theme.defaultCodingFontSize};
  background-color: ${backgroundColor};
`;
//  border-left: ${props =>
//    props.showLeftBorder ? props.theme.editorBorder : 'none'};
