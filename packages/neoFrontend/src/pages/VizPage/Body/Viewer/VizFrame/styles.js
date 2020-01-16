import styled from 'styled-components';
import { FrameFooter } from '../../styles';
import { LargeIcon } from '../../../../styles';

// Note that `position: relative;` is required due to useDimensions
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const LargeIconRightmost = styled(LargeIcon)`
  border-bottom-right-radius: ${props => props.theme.borderRadiusSmall}px;
`;

export const VizFrameFooter = styled(FrameFooter)`
  justify-content: space-between;
`;

export const VizFrameFooterRight = styled.div`
  display: flex;
`;
