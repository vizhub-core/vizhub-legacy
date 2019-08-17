import styled from 'styled-components';
import { Icon } from '../../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  font-family: Poppins;
  font-size: 12px;
  color: ${props => props.theme.dark};
`;

export const TopMessage = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${props => props.theme.bottomButtonBackgroundActive};
`;

export const TopOptions = styled.div`
  display: flex;
`;

export const TopOption = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bottomButtonBackgroundActive};
  margin: 1px ${props => (props.rightmost ? 0 : 1)}px 1px 0px;
  position: relative;
`;

export const Bottom = styled.div`
  display: flex;
`;

export const BottomButton = styled.div`
  flex: 1;
  height: 40px;
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
