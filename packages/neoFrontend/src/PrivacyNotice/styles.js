import styled from 'styled-components';

const borderRadius = 30;

export const Wrapper = styled.div`
  font-size: ${(props) => props.theme.text.small};
  font-weight: bold;
  background-color: ${(props) => props.theme.red};
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 ${(props) => (props.isVizPreview ? 8 : 10)}px;
  color: white;
  margin-top: ${(props) => (props.isVizPreview ? 10 : 0)}px;
  margin-left: ${(props) => (props.isVizPreview ? 0 : 12)}px;
  position: ${(props) => (props.isVizPreview ? 'absolute' : 'static')};
  border-top-left-radius: ${(props) =>
    props.isVizPreview ? 0 : borderRadius}px;
  border-bottom-left-radius: ${(props) =>
    props.isVizPreview ? 0 : borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;
`;

export const Label = styled.div`
  margin-right: 6px;
`;
