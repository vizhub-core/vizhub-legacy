import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const VizPreviews = styled.div`
  display: flex;
`;

// Inspired by https://vega.github.io/vega/
export const VizPreview = styled(Link)`
  margin: 30px;
`;

export const VizPreviewImage = styled.div`
  border: 0px;
  width: 230px;
  height: 120px;
  padding: 0px;
  background-position: left top;
  background-size: cover;
  overflow: hidden;
  position: relative;
  transition: background-position 3s;
  ${VizPreview}:hover & {
    background-position: right bottom;
  }
  box-shadow: ${props => props.theme.shadow};
  border-radius: 6px;
`;
