import styled from 'styled-components';
import { Content } from '../../../styles';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

export const Scroller = styled.div`
  flex: 1;
  overflow: auto;
`;

// This level handles horizontal centering & resize behavior.
export const Centering = styled.div`
  display: flex;
  justify-content: center;
`;

// Homage to bl.ocks.org with choice of 960px.
export const ViewerContent = styled(Content)`
  max-width: 960px;
  padding: 10px;
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: #bfc0bf;
`;
