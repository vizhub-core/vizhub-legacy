import styled from 'styled-components';

const borderRadius = 30;

export const Badge = styled.div`
  align-self:start;
  font-size: ${(props) => props.theme.text.small};
  font-weight: bold;
  background-color: ${(props) => props.theme.red};
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 10px;
  color: white;
  margin-top: 0px;
  margin-left: 12px;
  border-top-left-radius: ${borderRadius}px;
  border-bottom-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;
`;

export const Label = styled.div`
  margin-right: 6px;
`;
