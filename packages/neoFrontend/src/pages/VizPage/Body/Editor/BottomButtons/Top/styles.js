import styled from 'styled-components';
import { Clickable } from '../../../../../../styles';
import { bottomButtonHeight } from '../styles';

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${bottomButtonHeight};
  font-family: Poppins;
  font-size: 12px;
  color: ${props => props.theme.dark};
  background-color: ${props => props.theme.editorBackground};
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
  font-weight: 600;
`;

export const TopList = styled.div`
  display: flex;
  background-color: ${props => props.theme.bottomButtonBackgroundActive};
  flex-direction: column;
  padding: 7px 0 7px 0;
`;

export const TopListItem = styled(Clickable)`
  padding: 3px 10px 3px 10px;
  color: ${props => props.theme.dark};
`;
