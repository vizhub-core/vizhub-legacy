import styled from 'styled-components';

// Matrix (red, blue) X (normal, hover, active) X (outline, filled):
const buttonColor = (props) =>
  props.isDisabled
    ? props.theme.lightBorder
    : props.isRed
    ? props.theme.red
    : props.theme.blue;

const hoverButtonColorOutline = (props) =>
  props.isRed ? props.theme.redHover : props.theme.blueHover;
const hoverButtonColorFilled = (props) =>
  props.isRed ? props.theme.redHoverFilled : props.theme.blueHoverFilled;
const hoverButtonColor = (props) =>
  props.isDisabled
    ? props.theme.lightBorder
    : props.isFilled
    ? hoverButtonColorFilled(props)
    : hoverButtonColorOutline(props);

const activeButtonColorOutline = (props) =>
  props.isDisabled
    ? props.theme.lightBorder
    : props.isRed
    ? props.theme.redActive
    : props.theme.blueActive;
const activeButtonColorFilled = (props) =>
  props.isRed ? props.theme.redActiveFilled : props.theme.blueActiveFilled;

const activeButtonColor = (props) =>
  props.isFilled
    ? activeButtonColorFilled(props)
    : activeButtonColorOutline(props);

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-right: 16px;
  padding-left: 16px;
  height: ${(props) => props.theme.buttonHeight};
  border-radius: 6px;
  border: solid 1px ${buttonColor};
  font-size: 16px;
  font-weight: 500;
  color: ${(props) =>
    props.isDisabled
      ? props.theme.lightText
      : props.isFilled
      ? '#ffffff'
      : props.theme.dark};
  background-color: ${(props) =>
    props.isFilled ? buttonColor(props) : 'white'};
  text-decoration: none;

  :hover {
    background-color: ${hoverButtonColor};
  }

  :active {
    background-color: ${activeButtonColor};
  }

  user-select: none;
  margin-left: 8px;

  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
`;
