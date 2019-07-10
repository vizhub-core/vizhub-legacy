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

export const Title = styled.div`
  font-size: 22px;
`;

export const DevsOnly = styled.div`
  margin-top: 40px;
  margin-bottom: 5px;
  font-size: 10px;
  color: ${props => props.theme.attentionGrabber};
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 232px;
  height: 36px;
  border-radius: 6px;
  border: solid 1px #161514;

  font-size: 12px;
  color: ${props => props.theme.dark};
  text-decoration: none;

  :hover {
    background-color: ${props => props.theme.dark};
    color: white;
  }
`;
