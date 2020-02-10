import styled from 'styled-components';

export const Wrapper = styled.input`
  border: 1px solid ${props => props.theme.rule};
  border-radius: 4px;
  height: 48px;
  font-family: Inter;
  font-size: 16px;
  padding-left: 14px;
`;
