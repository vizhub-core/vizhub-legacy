// Common styles used in multiple pages.
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1380px;
  flex: 1;
`;

export const Banner = styled.div`
  height: 100px;
  margin-left: 6px;
  margin-right: 6px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
