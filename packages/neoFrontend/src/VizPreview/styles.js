import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  border-top-right-radius: ${props => props.theme.borderRadiusSmall}px;
  border-top-left-radius: ${props => props.theme.borderRadiusSmall}px;
  &:hover {
    background-position: right bottom;
  }
`;
