import styled from 'styled-components';

export const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  height: 412px;
  justify-content: center;
  align-items: center;
  max-width: 713px;

  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
`;

export const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 232px;
  height: 36px;
  border-radius: 6px;
  border: solid 1px #161514;

  font-size: 12px;
  color: currentColor;
  text-decoration: none;

  :hover {
  }
`;
