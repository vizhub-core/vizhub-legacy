import styled from 'styled-components';
import { Content } from '../../../styles';

// position: relative here is to support the Resizer.
export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

export const Scroller = styled.div`
  flex: 1;
  position: relative;
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
