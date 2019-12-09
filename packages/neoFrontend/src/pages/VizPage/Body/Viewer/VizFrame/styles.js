import styled from 'styled-components';
import { LargeIcon } from '../../../../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RunTimerProgressIndicator = styled.div.attrs(props => ({
  style: {
    width:
      (props.runTimerProgress === null ? 100 : props.runTimerProgress * 100) +
      '%'
  }
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  transition: opacity 2s;
  opacity: ${props => (props.runTimerProgress === null ? 0 : 1)};
  background-color: #3866e9;
`;

// TODO unify where border radius value is defined.
export const LargeIconRightmost = styled(LargeIcon)`
  border-bottom-right-radius: 3px;
`;
