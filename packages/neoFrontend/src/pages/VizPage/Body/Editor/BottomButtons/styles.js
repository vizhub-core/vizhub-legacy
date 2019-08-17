import styled from 'styled-components';
import { Icon } from '../../styles';

export const Wrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.editorSectionActiveColor};
`;

export const BottomButton = styled(Icon)`
  flex: 1;
  height: 40px;
`;
