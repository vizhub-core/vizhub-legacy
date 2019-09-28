import styled from 'styled-components';
import { Clickable } from '../../../../../../styles';
import { FileStyle } from '../styles';

export const FileEntry = styled(Clickable)`
  ${FileStyle}
  text-decoration: ${props => (props.isActive ? 'underline' : 'none')};
`;

export const DirectoryEntry = styled(Clickable)`
  ${FileStyle}
  position: relative;
`;
