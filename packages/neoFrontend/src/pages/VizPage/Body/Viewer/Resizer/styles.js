import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 15px;
  &:hover {
    background-color: ${props => props.theme.hoverBackground};
    cursor: col-resize;
  }
`;
