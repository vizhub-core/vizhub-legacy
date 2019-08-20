import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Inspired by https://vega.github.io/vega/
export const VizPreview = styled(Link)`
  display: inline-block;
  margin: 10px;
  width: 230px;
`;

export const VizPreviewImage = styled.img`
  width: 252px;
  height: 150px;
  padding: 0px;
  background-position: left top;
  background-size: cover;
  overflow: hidden;
  position: relative;
  transition: background-position 3s;
  outline: 1px solid #ddd;
  ${VizPreview}:hover & {
    background-position: right bottom;
  }
`;
