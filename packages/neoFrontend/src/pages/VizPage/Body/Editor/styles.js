import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  color: #ffffff;
  background-color: #3d4b65;
`;

export const Sidebar = styled.div`
  width: 150px;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.36;
  display: flex;
  flex-direction: column;
`;

export const CodeEditor = styled.div`
  width: 500px;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
`;
