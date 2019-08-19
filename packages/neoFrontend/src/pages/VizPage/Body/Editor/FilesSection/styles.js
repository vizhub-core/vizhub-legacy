import styled from 'styled-components';
import { Clickable } from '../../../../../styles';

const FileStyle = props => `
  display: flex;
  align-items: center;
  height: ${props.theme.editorEntryHeight}px;
  padding-left: ${props.theme.editorEntryHorizontalPadding +
    props.theme.editorEntryIndentation}px;
  border-left: ${props.theme.editorEntryLeftBorderSize}px solid
    ${props.isActive ? props.theme.editorFileActiveColor : 'transparent'};
`;

export const FileEntry = styled(Clickable)`
  ${FileStyle}
  text-decoration: ${props => (props.isActive ? 'underline' : 'none')};
`;

export const EditableFileEntry = styled.div`
  position: relative;
  height: ${props => props.theme.editorEntryHeight}px;
`;

export const EditableFileInput = styled.input`
  ${FileStyle}
  font-family: ${props => props.theme.defaultCodingFontFamily};
  font-size: ${props => props.theme.defaultCodingFontSize};
  border-top: 0;
  border-bottom: 0;
  border-right: 0;
  outline: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  color: ${props => props.theme.dark};
  position: absolute;
  width: 100%;
  box-sizing: border-box;
`;
