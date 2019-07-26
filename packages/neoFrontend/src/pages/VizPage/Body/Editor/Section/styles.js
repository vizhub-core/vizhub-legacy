import styled from 'styled-components';
import { Clickable } from '../../../../../styles';

export const Wrapper = styled.div`
  margin-bottom: 1px;
  background-color: ${props =>
    props.isActive ? props.theme.editorSectionActiveColor : 'transparent'};
`;

export const TitleEntry = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${props => props.theme.editorEntryHorizontalPadding}px;
  height: ${props => props.theme.editorEntryHeight}px;
  border-left: 5px solid
    ${props =>
      props.isActive ? 'transparent' : props.theme.editorSectionActiveColor};
  position: relative;
`;

export const ClickableOverlay = styled(Clickable)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
