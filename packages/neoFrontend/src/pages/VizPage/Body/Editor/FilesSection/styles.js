import styled from 'styled-components';
import { Clickable } from '../../../../../styles';

export const FileEntry = styled(Clickable)`
  padding-top: ${props => props.theme.editorEntryVerticalPadding}px;
  padding-bottom: ${props => props.theme.editorEntryVerticalPadding}px;
  padding-left: ${props =>
    props.theme.editorEntryHorizontalPadding +
    props.theme.editorEntryIndentation}px;
  padding-right: ${props => props.theme.editorEntryHorizontalPadding}px;
  border-left: ${props => props.theme.editorEntryLeftBorderSize}px solid
    ${props =>
      props.isActive ? props.theme.editorFileActiveColor : 'transparent'};
  text-decoration: ${props => (props.isActive ? 'underline' : 'none')};
`;
