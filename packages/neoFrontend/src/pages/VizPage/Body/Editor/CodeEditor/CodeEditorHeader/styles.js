import styled from 'styled-components';
import { Icon } from '../../../styles';
import { isMobile } from '../../../../../../mobileMods';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  background-color: ${props => isMobile ? 'transparent':props.theme.editor.headerBackgroundColor};
`;
//box-shadow: ${props => props.theme.shadow};

export const Icons = styled.div`
  display: flex;
`;

export const CodeEditorIcon = styled(Icon)`
  height: ${props => props.theme.editorEntryHeight + 1}px;
  padding-right: ${props => (props.rightmost ? 8 : 5)}px;
  padding-left: ${props => (props.leftmost ? 8 : 5)}px;
`;
