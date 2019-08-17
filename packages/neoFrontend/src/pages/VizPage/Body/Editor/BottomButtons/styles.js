import styled from 'styled-components';
import { Icon } from '../../styles';

export const Wrapper = styled.div`
  display: flex;
`;

export const BottomButton = styled(Icon)`
  flex: 1;
  height: 40px;
  background-color: ${props =>
    props.isActive
      ? props.theme.bottomButtonBackgroundActive
      : props.theme.bottomButtonBackground};
`;
