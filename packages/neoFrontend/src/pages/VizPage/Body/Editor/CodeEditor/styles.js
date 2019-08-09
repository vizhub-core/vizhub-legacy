import styled from 'styled-components';
import { EditorComponent } from '../styles';

export const Wrapper = styled(EditorComponent)`
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  font-size: ${props => props.theme.defaultCodingFontSize};
`;
//  border-left: ${props =>
//    props.showLeftBorder ? props.theme.editorBorder : 'none'};
