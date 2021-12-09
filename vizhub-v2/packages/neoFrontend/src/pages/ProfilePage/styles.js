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
  ${isMobile ? '' : 'width: 170px;'}
  margin-top: ${isMobile ? '10px' : '0'};
  padding: 0 6px;
`;
