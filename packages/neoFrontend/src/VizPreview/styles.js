import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const VizPreviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// Inspired by https://vega.github.io/vega/
export const VizPreview = styled(Link)`
  margin: 12px;
  width: 230px;
  height: 120px;
  background-position: left top;
  background-size: cover;
  overflow: hidden;
  position: relative;
  transition: background-position 3s;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  &:hover {
    background-position: right bottom;
  }
`;
