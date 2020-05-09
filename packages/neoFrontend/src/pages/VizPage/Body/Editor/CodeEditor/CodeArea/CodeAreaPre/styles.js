import styled from 'styled-components';

export const Wrapper = styled.pre`
  flex: 1;
  padding: 10px;
  margin: 0;
  font-family: ${(props) => props.theme.defaultCodingFontFamily};
  line-height: 1.93;
`;
