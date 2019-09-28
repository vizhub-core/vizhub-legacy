export const FileStyle = props => `
  display: flex;
  align-items: center;
  height: ${props.theme.editorEntryHeight}px;
  padding-left: ${props.theme.editorEntryHorizontalPadding +
    props.theme.editorEntryIndentation * props.indent}px;
  border-left: ${props.theme.editorEntryLeftBorderSize}px solid
    ${props.isActive ? props.theme.editorFileActiveColor : 'transparent'};
`;

