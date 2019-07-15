import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 30px;
  background-color: #ffffff;
  box-shadow: ${props => props.theme.shadow};

  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  padding-left: 9px;
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  justify-content: space-between;
`;
