import styled from 'styled-components';
import { Clickable, Z_ABOVE } from '../../../styles';
import { Content } from '../../styles';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  z-index: ${Z_ABOVE};
`;

// Set z index, just so the shadow from the top
// can cast on top of the bottom content
// when it is scrolled.
export const Top = styled.div`
  z-index: ${Z_ABOVE};
`;

// Big WTF moment - here's why "min-height: 0" right here:
// https://moduscreate.com/blog/how-to-fix-overflow-issues-in-css-flex-layouts/
export const Bottom = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

export const VizViewerScroller = styled.div`
  flex: 1;
  overflow: auto;
`;

// This level handles horizontal centering & resize behavior.
export const VizViewerCentering = styled.div`
  display: flex;
  justify-content: center;
`;

// Homage to bl.ocks.org with choice of 960px.
export const VizViewerContent = styled(Content)`
  max-width: 960px;
  padding: 10px;
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: #bfc0bf;
`;

export const Icon = styled(Clickable)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 35px;
  margin-right: ${props => (props.rightmost ? '9px' : '0')};
`;

export const Footer = styled.div`
  box-shadow: ${props => props.theme.shadow};
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #ffffff;
`;

export const FooterIcon = styled(Icon)`
  width: auto;
  height: 40px;
  padding-right: ${props => (props.rightmost ? '10' : '7')}px;
  padding-left: ${props => (props.leftmost ? '10' : '7')}px;
  margin-right: 0;
`;
