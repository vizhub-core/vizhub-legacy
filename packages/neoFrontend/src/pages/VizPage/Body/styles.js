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

export const Torso = styled(Content)`
  max-width: 980px;
  padding: 10px;
`;
