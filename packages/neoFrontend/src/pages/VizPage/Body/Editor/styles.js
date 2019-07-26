import styled from 'styled-components';

export const EditorComponent = styled.div`
  display: flex;
  color: #ffffff;
  background-color: #3d4b65;
`;

export const Sidebar = styled(EditorComponent)`
  ${props => (props.expand ? 'flex: 1' : 'width: 150px')};
  font-family: ${props => props.theme.defaultCodingFontFamily};
  display: flex;
  flex-direction: column;
`;
