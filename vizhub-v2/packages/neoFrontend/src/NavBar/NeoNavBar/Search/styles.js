import styled from 'styled-components';
import { Clickable } from '../../../styles';

export const SearchInputWrapper = styled.div`
  display: flex;
  height: 44px;
  background: #494949;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
`;

export const SearchInputIcon = styled(Clickable)`
  cursor: pointer;
  padding: 13px 13px 13px 13px;
`;

export const SearchInput = styled.input`
  width: ${(props) => (props.mobile ? '100%' : '200px')};
  background: transparent;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #b5b5b5;
  padding-left: 6px;
`;

export const Form = styled.form`
  position: relative;
  margin-left: ${(props) => props.theme.bannerPadding}px;
  margin-right: ${(props) => props.theme.bannerPadding}px;
`;
