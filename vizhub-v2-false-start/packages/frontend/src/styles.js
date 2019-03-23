import styled from 'styled-components';

// lineHeight: '1.1',
// size: '18pt'

export const Flex = styled.div`
  display: flex;
`;

export const Wrapper = styled(Flex)`
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
