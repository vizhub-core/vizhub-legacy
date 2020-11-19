import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  background-color: ${(props) => props.theme.editor.headerBackgroundColor};
`;

export const Icons = styled.div`
  display: flex;
`;
