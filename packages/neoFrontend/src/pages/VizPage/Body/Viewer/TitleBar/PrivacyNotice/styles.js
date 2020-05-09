import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.red};
  height: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px 0 12px;
  font-weight: bold;
  font-size: 14px;
  color: white;
  margin-left: 15px;
`;

export const Label = styled.div`
  margin-right: 10px;
`;
