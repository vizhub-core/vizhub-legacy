import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 12px;
  margin: 0 0 4px 0;
  ${(props) =>
    props.active
      ? 'background: rgba(56, 102, 233, 0.15); border-radius: 1000px;'
      : ''}
  display: flex;
  color: #797979;
`;

export const LinkText = styled.div`
  margin-left: 10px;
  color: #161514;
`;
