import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 400px;
  position: relative;
`;

export const Bar = styled.div`
  position: absolute;
  top: 30px;
  bottom: 30px;
  right: 0;
  left: 0;
  border-radius: 3px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(to bottom, #55627c, #3d4b65);
}
`;
