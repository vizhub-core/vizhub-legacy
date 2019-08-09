import styled from 'styled-components';
import { Icon } from '../../../styles';
import { isMobile } from '../../../../../../mobileMods';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  background-color: ${props =>
    isMobile || !props.showEditor
      ? 'transparent'
      : props.theme.editor.headerBackgroundColor};
`;
// margin-bottom: 1px;
//box-shadow: ${props => props.theme.shadow};

export const Icons = styled.div`
  display: flex;
`;

export const CodeEditorIcon = styled(Icon)`
  height: ${props => props.theme.editorEntryHeight}px;
  padding-right: ${props => (props.rightmost ? 8 : 5)}px;
  padding-left: ${props => (props.leftmost ? 8 : 5)}px;
`;
