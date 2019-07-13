import styled from 'styled-components';
import { Z_BELOW } from '../../../styles';
import { Content } from '../../styles';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
`;

// Set z index, just so the shadow from the top
// can cast on top of the bottom content
// when it is scrolled.
export const Bottom = styled.div`
  z-index: ${Z_BELOW};
  overflow: auto;
`;

// This level handles horizontal centering & resize behavior.
export const TorsoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// Homage to bl.ocks.org with choice of 960px.
export const Torso = styled(Content)`
  max-width: 960px;
  padding: 10px;
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: #bfc0bf;
`;

export const Clickable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  margin-right: ${props => (props.rightmost ? '9px' : '0')};
  cursor: pointer;
`;

export const Icon = styled(Clickable)`
  width: 35px;
`;
