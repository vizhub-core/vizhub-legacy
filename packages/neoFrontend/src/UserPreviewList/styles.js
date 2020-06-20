import styled from 'styled-components';
import { Clickable } from '../styles';

export const Container = styled.div`
  position: absolute;
  top: 39px;
  left: 7px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.lightBorder};
  border-radius: 4px;
  background-color: white;
  z-index: 999;

  &:empty {
    display: none;
  }
`;

export const UserPreview = styled(Clickable)`
  height: ${(props) => props.theme.buttonHeight};
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
`;

export const UserName = styled.div`
  padding-left: 12px;
`;

export const CollaboratorListWrapper = styled.div`
  padding-top: 32px;
`;
