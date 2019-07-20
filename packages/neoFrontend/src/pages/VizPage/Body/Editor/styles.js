import styled from 'styled-components';
import { Clickable } from '../../../../styles';

export const Wrapper = styled.div`
  width: 150px;
  color: #ffffff;
  background-color: #3d4b65;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.36;
  display: flex;
  flex-direction: column;
`;

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
