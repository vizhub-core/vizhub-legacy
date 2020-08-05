import styled from 'styled-components';
import icon from './icon.svg';

export const SearchInputWrapper = styled.div`
  display: flex;
  height: 44px;
  background: #494949;
  border-radius: 4px;
  border: none;
  padding: 13px 5px 13px 13px;
  box-sizing: border-box;
`;

export const SearchInputIcon = styled.div`
  height: 20px;
  min-width: 20px;
  background-image: url(${icon});
  background-repeat: no-repeat;
  margin-right: 9px;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: ${(props) => (props.mobile ? '100%' : '200px')};
  background: transparent;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #b5b5b5;
`;

export const Form = styled.form`
  position: relative;
  margin-left: ${(props) => props.theme.bannerPadding}px;
  margin-right: ${(props) => props.theme.bannerPadding}px;
`;
