import styled from 'styled-components';
import { Clickable } from '../../../../styles';

export const Wrapper = styled.div`
  width: 150px;
  color: #ffffff;
  background-color: #3d4b65;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  display: flex;
  flex-direction: column;
`;

export const Section = styled(Clickable)`
  border-left: 5px solid rgba(192, 192, 192, 0.22);
  margin-bottom: 1px;
  padding: 5px 15px 5px 15px;
`;
