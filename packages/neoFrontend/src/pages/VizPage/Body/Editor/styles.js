import styled from 'styled-components';

export const EditorComponent = styled.div`
  display: flex;
  color: #ffffff;
  background-color: #3d4b65;
`;

export const Sidebar = styled(EditorComponent)`
  ${props =>
    props.showViewer
      ? `
        width: 150px;
      `
      : `
        flex: 1;
      `}
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.36;
  display: flex;
  flex-direction: column;
`;
