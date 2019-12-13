import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Footer, Z_WAY_ABOVE } from '../styles';

export const VizPreviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px;
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
  box-shadow: ${props => props.theme.shadow};
  border-top-right-radius: ${props => props.theme.borderRadiusLarge}px;
  border-top-left-radius: ${props => props.theme.borderRadiusLarge}px;
  &:hover {
    background-position: right bottom;
  }
`;

export const VizPreviewFooter = styled(Footer)`
  border-bottom-right-radius: ${props => props.theme.borderRadiusLarge}px;
  border-bottom-left-radius: ${props => props.theme.borderRadiusLarge}px;
  z-index: ${Z_WAY_ABOVE};
  padding-left: 10px;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  flex: 1;
  padding-top: 4px;
  padding-bottom: 10px;
`;

export const VizPreviewTitle = styled.div`
  font-size: 15px;
  padding-bottom: 3px;
`;
