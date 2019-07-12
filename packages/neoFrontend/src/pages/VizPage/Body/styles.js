import styled from 'styled-components';
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
  z-index: -1;
  overflow: auto;
`;

export const TorsoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Torso = styled(Content)`
  max-width: 980px;
  padding: 10px;
`;

export const VizFrame = styled.div`
  max-width: 960px;
  height: 500px;
  box-shadow: ${props => props.theme.shadow};
  background-color: #ffffff;
  border-radius: 0 0 3px 3px;
`;
