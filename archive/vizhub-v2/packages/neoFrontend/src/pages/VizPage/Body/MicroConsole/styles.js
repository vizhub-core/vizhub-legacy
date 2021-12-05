import styled from 'styled-components';

export const Wrapper = styled.div`
  height: ${(props) => props.theme.bannerHeight + props.theme.headHeight}px;
  background-color: #ffffff;
  font-size: 6pt;
  font-family: ${(props) => props.theme.defaultCodingFontFamily};
  position: relative;
`;

export const Scroller = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Output = styled.pre`
  margin: 0;
  padding: 2px;
  box-sizing: border-box;
`;

export const CornerTitle = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  color: rgba(0, 0, 0, 0.3);
`;
