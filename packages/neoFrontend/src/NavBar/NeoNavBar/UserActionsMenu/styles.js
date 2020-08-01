import styled from 'styled-components';
import { Clickable, Z_WAY_WAY_ABOVE } from '../../../styles';
import arrowDown from './arrowDown.svg';

const ARROW_WIDTH = 9;
const PADDING_TO_ARROW = 6;

export const Wrapper = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.height + ARROW_WIDTH + PADDING_TO_ARROW}px;

  background-image: url(${arrowDown});
  background-repeat: no-repeat;
  background-position-x: ${(props) => props.height + PADDING_TO_ARROW}px;
  background-position-y: ${(props) => Math.floor(props.height / 2)}px;
`;

export const Menu = styled.div`
  position: absolute;
  top: ${(props) =>
    props.mobile ? props.theme.bannerHeightMobile : props.theme.bannerHeight}px;
  right: 18px;

  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 4px 4px;

  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => props.theme.text.medium};

  color: #535353;
  z-index: ${Z_WAY_WAY_ABOVE};
`;

export const Item = styled(Clickable)`
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.theme.dark};
  height: 40px;
  padding: 0 20px;
  display: flex;
  align-items: center;

  &:hover {
    background: rgb(
      56,
      102,
      233,
      0.2
    ); // same as background: #3866E9 with opacity: 0.2;
  }
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.rule};
`;
