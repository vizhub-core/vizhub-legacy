import styled from 'styled-components';
import { isMobile } from '../../mobileMods';

export const SidebarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${isMobile ? 'column' : 'row'};
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: ${isMobile ? '100%' : '220px'};
  ${isMobile ? 'flex: 1;' : ''}
  align-items: ${isMobile ? 'center' : 'normal'};
  margin-right: ${isMobile ? '0px' : '100px'};
  margin-top: ${isMobile ? '10px' : '0'};
  padding: ${isMobile ? '0' : '0 6px'};
`;


