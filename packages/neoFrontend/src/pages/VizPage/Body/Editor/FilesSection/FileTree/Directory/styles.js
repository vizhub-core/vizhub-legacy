import styled from 'styled-components';

const arrowXOffset = 2;
export const ArrowWrapper = styled.div`
  position: absolute;
  left: ${(props) =>
    props.theme.editorEntryHorizontalPadding +
    props.theme.editorEntryIndentation * (props.indent - 1) -
    arrowXOffset}px;
  transition: transform 150ms;
  transform: rotate(${(props) => props.rotate}deg);
`;
