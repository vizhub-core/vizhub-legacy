import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 12px;
  margin: 4px 0;
  ${(props) =>
    props.active
      ? 'background: rgba(56, 102, 233, 0.15); border-radius: 1000px;'
      : ''}
`;

export const LinkText = styled.div`
  margin-left: 15px;
  color: #000000;
`;

export const Link = styled.a`
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #797979;
`;
export const Blank = styled.span``;
