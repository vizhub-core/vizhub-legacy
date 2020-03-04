import styled from 'styled-components';

export const Wrapper = styled.input`
  height: 100%;
  ${props => (props.size === 'grow' ? 'flex: 1;' : '')}
  ${props =>
    props.size === 'large' ? 'width: 87px;' : ''}
  font-size: inherit;
  border: 1px solid ${props => props.theme.rule};
  border-radius: 4px;
  padding-left: 14px;
`;
