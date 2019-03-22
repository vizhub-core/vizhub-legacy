import styled from 'styled-components';
import { Flex } from '../styles';

export const StudioWrapper = styled(Flex)`
  flex: 1;
  overflow: hidden;
`;

const ForegroundBackground = styled(Flex)`
  background: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
`;

export const ConfiguratorWrapper = styled(ForegroundBackground)`
  flex: 0 0 auto;
  overflow: auto;
`;

export const EditorWrapper = styled(ForegroundBackground)`
  flex: 1;
  overflow: auto;
  height: 100%;
`;

export const ViewerWrapper = styled(ForegroundBackground)`
  flex: 1;
  overflow: auto;
  justify-content: center;
`;
