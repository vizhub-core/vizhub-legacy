import styled from 'styled-components';

export const Left = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-left: ${(props) => props.theme.navLinkGapSize}px;
  }

  > *:first-child {
    margin-left: 0px;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-left: auto;

  > * {
    margin-right: ${(props) => props.theme.navLinkGapSize}px;
  }

  > *:last-child {
    margin-right: 0px;
  }
`;
