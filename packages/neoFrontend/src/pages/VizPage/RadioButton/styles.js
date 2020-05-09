import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-top: ${(props) => (props.vertical ? 12 : 5)}px;
  padding-bottom: ${(props) => (props.vertical ? 12 : 5)}px;
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
// padding-top: ${props => (props.vertical ? 12 : 0)}px;
// padding-bottom: ${props => (props.vertical ? 12 : 0)}px;
