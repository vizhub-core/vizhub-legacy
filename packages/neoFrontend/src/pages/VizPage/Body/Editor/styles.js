import styled from 'styled-components';

export const EditorComponent = styled.div`
  display: flex;
  color: #ffffff;
  background-color: ${(props) => props.theme.editorBackground};
`;

export const Sidebar = styled(EditorComponent)`
  ${(props) => (props.expand ? 'flex: 1' : 'min-width: 150px')};
  font-family: ${(props) => props.theme.defaultCodingFontFamily};
  font-size: ${(props) => props.theme.defaultCodingFontSize};
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Bottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;
