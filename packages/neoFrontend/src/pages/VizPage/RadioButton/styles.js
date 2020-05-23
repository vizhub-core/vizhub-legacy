import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 32px;
`;

export const Label = styled.div`
  margin-left: 8px;
  font-size: 16px;
  font-family: Inter;
`;

export const GroupWrapper = styled.div`
  display: flex;
  ${(props) => (props.vertical ? 'flex-direction: column;' : '')}
`;
