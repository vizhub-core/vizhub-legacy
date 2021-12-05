import styled from 'styled-components';
import { SmallText } from '../styles';

const desktopOnlyMedia = `
  @media (max-width: 700px) {
    display: none;
  }
`;

export const Wrapper = styled(SmallText)`
  max-width: 90px;
  min-width: 62px;
  background: white;
  border: none;
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${props => (props.desktopOnly ? desktopOnlyMedia : '')}
`;

export const Icon = styled.div`
  width: 25px;
`;
