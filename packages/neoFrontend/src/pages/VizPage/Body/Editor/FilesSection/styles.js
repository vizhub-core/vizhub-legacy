import styled from 'styled-components';
import { Clickable } from '../../../../../styles';

export const FileEntry = styled(Clickable)`
  display: flex;
  align-items: center;
  height: ${props => props.theme.editorEntryHeight}px;
  padding-left: ${props =>
    props.theme.editorEntryHorizontalPadding +
    props.theme.editorEntryIndentation}px;
  border-left: ${props => props.theme.editorEntryLeftBorderSize}px solid
    ${props =>
      props.isActive ? props.theme.editorFileActiveColor : 'transparent'};
  text-decoration: ${props => (props.isActive ? 'underline' : 'none')};
`;
