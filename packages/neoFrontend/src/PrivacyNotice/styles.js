import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.red};
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px 0 12px;
  font-weight: bold;
  font-size: 14px;
  color: white;
  margin-top: ${props => props.isVizPreview ? 10 : 0}px;
  margin-left: ${props => props.isVizPreview ? 0 : 15}px;
  position: ${props => props.isVizPreview ? 'absolute' : 'static'};
  border-top-left-radius: ${props => props.isVizPreview ? 0 : 40}px;
  border-bottom-left-radius: ${props => props.isVizPreview ? 0 : 40}px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
`;

export const Label = styled.div`
  margin-right: 10px;
`;
