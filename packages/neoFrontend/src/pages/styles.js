// Common styles used in multiple pages.
import styled from 'styled-components';
import { Clickable } from '../styles';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1380px;
  flex: 1;
`;

export const Title = styled.div`
  font-size: 22px;
`;

export const DevsOnly = styled.div`
  margin-top: 40px;
  margin-bottom: 5px;
  font-size: 10px;
  color: ${props => props.theme.attentionGrabber};
`;

const buttonColor = props => (props.isRed ? props.theme.red : props.theme.blue);

const hoverButtonColorOutline = props =>
  props.isRed ? props.theme.redHover : props.theme.blueHover;
const hoverButtonColorFilled = props =>
  props.isRed ? props.theme.redHoverFilled : props.theme.blueHoverFilled;
const hoverButtonColor = props =>
  props.isFilled
    ? hoverButtonColorFilled(props)
    : hoverButtonColorOutline(props);

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 232px;
  height: 48px;
  border-radius: 6px;
  border: solid 1px ${buttonColor};
  font-size: 16px;
  font-weight: 500;
  color: ${props => (props.isFilled ? '#ffffff' : props.theme.dark)};
  background-color: ${props =>
    props.isFilled ? buttonColor(props) : 'transparent'};
  text-decoration: none;

  :hover {
    background-color: ${hoverButtonColor};
  }

  cursor: pointer;
  margin-left: 8px;
  font-family: Inter;
`;

export const Centering = styled.div`
  display: flex;
  justify-content: center;
`;

export const Text = styled.div`
  max-width: 960px;
  padding: 10px;
`;

export const Icon = styled(Clickable)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LargeIcon = styled(Icon)`
  height: 40px;
  padding-right: ${props => (props.rightmost ? 10 : 7)}px;
  padding-left: ${props => (props.leftmost ? 10 : 7)}px;
`;
