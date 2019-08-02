import styled from 'styled-components';

export const Wrapper = styled.textarea`
  flex: 1;
  padding: 10px;
  margin: 0;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.93;
  background-color: transparent;
  color: #ffffff;
  border: none;
  resize: none;
  outline: none;
`;
