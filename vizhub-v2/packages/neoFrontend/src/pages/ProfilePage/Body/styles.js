import styled from 'styled-components';
import { isMobile } from '../../../mobileMods';
import { Centering } from '../../styles';

export const ProfileMenuBar = styled(Centering)`
  flex-direction: ${isMobile ? 'column' : 'row'};
  align-items: ${isMobile ? 'center' : 'unset'};
`;
