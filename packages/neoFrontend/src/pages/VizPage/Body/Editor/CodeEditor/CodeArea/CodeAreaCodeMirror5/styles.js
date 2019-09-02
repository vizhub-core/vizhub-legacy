import styled from 'styled-components';
import { Z_NEW_STACKING_CONTEXT } from '../../../../../../../styles';

export const Wrapper = styled.div`
  flex: 1;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  position: relative;
  min-height: 0px;
  z-index: ${Z_NEW_STACKING_CONTEXT};
`;
