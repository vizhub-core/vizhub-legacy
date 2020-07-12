import styled from 'styled-components';
import icon from './icon.svg';

export const SearchInput = styled.input`
  width: ${(props) => (props.mobile ? '100%' : '240px')};
  height: 44px;
  background: #494949;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #b5b5b5;
  padding: 13px 5px 13px 45px;
  box-sizing: border-box;
  background-image: url(${icon});
  background-repeat: no-repeat;
  background-position-x: 15px;
  background-position-y: 12px;
`;

export const Form = styled.form`
  margin-left: ${(props) => props.theme.bannerPadding}px;
  margin-right: ${(props) => props.theme.bannerPadding}px;
`;
