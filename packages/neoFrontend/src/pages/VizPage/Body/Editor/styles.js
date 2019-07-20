import styled from 'styled-components';
import { Clickable } from '../../../../styles';

export const Wrapper = styled.div`
  width: 150px;
  color: #ffffff;
  background-color: #3d4b65;
  font-family: ${props => props.theme.defaultCodingFontFamily};
  line-height: 1.36;
  display: flex;
  flex-direction: column;
`;

export const FileEntry = styled(Clickable)`
  padding: 5px 15px 5px 25px;
  border-left: 5px solid
    ${props => (props.isActive ? '#ffffff' : 'transparent')};
`;
