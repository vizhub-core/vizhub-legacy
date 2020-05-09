import styled from 'styled-components';
import { LargeIcon } from '../../../../styles';

// Note that `position: relative;` is required due to useDimensions
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const LargeIconRightmost = styled(LargeIcon)`
  border-bottom-right-radius: ${(props) => props.theme.borderRadiusSmall}px;
`;
