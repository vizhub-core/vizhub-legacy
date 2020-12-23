import styled from 'styled-components';
import { Icon } from '../../../../styles';
import { EditorComponent } from '../styles';
import { backgroundColor } from '../themes/vizHub';

export const Wrapper = styled(EditorComponent)`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.defaultCodingFontFamily};
  font-size: ${(props) => props.theme.defaultCodingFontSize};
  background-color: ${backgroundColor};
`;

export const CodeEditorIcon = styled(Icon)`
  height: ${(props) => props.theme.editorEntryHeight + 1}px;
  padding-right: ${(props) => (props.rightmost ? 8 : 5)}px;
  padding-left: ${(props) => (props.leftmost ? 8 : 5)}px;
`;

export const HeaderLink = styled.a`
  color: #ffffff;
  display: flex;
  align-items: center;
  opacity: 0.1;
  transition: opacity 0.2s ease-out;
  :hover {
    opacity: 1;
  }
`;

export const LogoWrapper = styled.a`
  color: #ffffff;
  display: flex;
  padding: 2px;
`;

export const LogoText = styled.div`
  font-weight: bold;
  margin-right: 8px;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.2s ease-out;
  ${HeaderLink}:hover & {
    opacity: 1;
  }
`;
