import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Footer, Z_WAY_ABOVE } from '../styles';

export const VizPreviews = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px;
  color: ${(props) => props.theme.dark};
  position: relative;
`;

// Inspired by https://vega.github.io/vega/
export const ImageLink = styled(Link)`
  width: 230px;
  height: 120px;
  background-position: left top;
  background-size: cover;
  overflow: hidden;
  position: relative;
  transition: background-position 3s;
  box-shadow: ${(props) => props.theme.shadow};
  border-top-right-radius: ${(props) => props.theme.borderRadiusLarge}px;
  border-top-left-radius: ${(props) => props.theme.borderRadiusLarge}px;
  &:hover {
    background-position: right bottom;
  }
`;

export const VizPreviewFooter = styled(Footer)`
  border-bottom-right-radius: ${(props) => props.theme.borderRadiusLarge}px;
  border-bottom-left-radius: ${(props) => props.theme.borderRadiusLarge}px;
  box-sizing: border-box;
  z-index: ${Z_WAY_ABOVE};
  padding-left: 6px;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding-top: 2px;
  padding-bottom: 6px;
  height: 50px;
  width: 230px;
`;

export const VizPreviewTitle = styled(Link)`
  font-size: 14px;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
  color: currentcolor;
`;
