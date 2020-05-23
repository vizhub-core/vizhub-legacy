import styled from 'styled-components';
import { Clickable } from '../../../../styles';

export const UserPreviewList = styled.div`
  position: absolute;
  top: 39px;
  left: 7px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.lightBorder};
  border-radius: 4px;
  background-color: white;
`;

export const UserPreview = styled(Clickable)`
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
`;

export const UserName = styled.div`
  padding-left: 12px;
`;

export const CollaboratorWrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
`;
