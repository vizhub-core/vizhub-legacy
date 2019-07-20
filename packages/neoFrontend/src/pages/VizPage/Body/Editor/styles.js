import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 150px;
  color: #ffffff;
  background-color: #3d4b65;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.36;
  display: flex;
  flex-direction: column;
`;
