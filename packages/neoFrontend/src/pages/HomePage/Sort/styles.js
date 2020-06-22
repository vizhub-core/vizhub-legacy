import styled from 'styled-components';
import selectArrow from './selectArrow.svg';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #000000;

  opacity: 0.6;
`;

export const Header = styled.div`
  h1 {
    margin: 0 0 8px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 42px;
    color: #353433;
  }

  h4 {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #797979;
  }
`;

export const Select = styled.select`
  display: block;
  appearance:none;
  padding: 12px 14px 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 4px;
  background: transparent;
  height: 44px;
  width: 266px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
background-image: url(${selectArrow});
  background-repeat: no-repeat;
  background-position-x: 228px;
  background-position-y: 10px;
`;
