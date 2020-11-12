import styled from 'styled-components';

export const Entry = styled.div`
  display: flex;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: ${(props) => props.theme.borderRadiusLarge}px;
`;
