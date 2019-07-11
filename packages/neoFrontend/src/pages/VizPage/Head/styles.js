import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 30px;
  background-color: #ffffff;
  box-shadow: ${props => props.theme.shadow};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 30px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  margin-right: ${props => (props.rightmost ? '9px' : '0')};
  cursor: pointer;
`;
