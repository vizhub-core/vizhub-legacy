import styled from 'styled-components';
import { Icon } from '../../styles';

export const Wrapper = styled.div`
  display: flex;
`;

export const BottomButton = styled.div`
  flex: 1;
  height: 40px;
  background-color: ${props =>
    props.isActive
      ? props.theme.bottomButtonBackgroundActive
      : props.theme.bottomButtonBackground};
  position: relative;
`;

export const ClickableOverlay = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
