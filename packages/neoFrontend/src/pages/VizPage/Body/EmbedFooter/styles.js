import styled from 'styled-components';
import { Z_WAY_ABOVE } from '../../../../styles';

export const Authorship = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const AuthorName = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-left: 10px;
`;

export const Title = styled.div`
  flex: 2;
`;

export const VizInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-right: 12px;
`;

export const Wrapper = styled.a`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_WAY_ABOVE};
  box-sizing: border-box;
  height: 36px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px 5px 11px;
`;
