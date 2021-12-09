import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  ${(props) => (props.isSmall ? 'font-size: 10px;' : '')}
`;

export const VizLink = styled(Link)`
  font-style: italic;
`;
