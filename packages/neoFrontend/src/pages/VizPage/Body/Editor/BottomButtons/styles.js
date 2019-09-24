import styled from 'styled-components';
import { Icon } from '../../styles';

export const bottomButtonHeight = '40px';

export const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Bottom = styled.div`
  display: flex;
`;

export const BottomButton = styled.div`
  flex: 1;
  height: ${bottomButtonHeight};
  background-color: ${props =>
    props.isActive
      ? props.theme.bottomButtonBackgroundActive
      : props.theme.bottomButtonBackground};
  color: ${props =>
    props.isActive ? props.activeColor || props.theme.dark : '#ffffff'};
  position: relative;
`;

export const ClickableOverlay = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${props => props.color || 'currentColor'};
`;
