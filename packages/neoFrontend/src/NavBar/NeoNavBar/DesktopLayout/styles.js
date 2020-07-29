import styled from 'styled-components';

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-left: auto;

  > * {
    margin-right: 28px;
  }

  > *:last-child {
    margin-right: 0px;
  }
`;
