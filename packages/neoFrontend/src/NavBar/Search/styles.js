import styled from 'styled-components';

export const SearchInput = styled.input`
  width: 120%;
  height: ${(props) => props.theme.buttonHeight};
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.55);
  border: none;
  padding-left: 10px;
`;

export const Form = styled.form`
  position: relative;
  margin-left: ${(props) => props.theme.bannerPadding}px;
  margin-right: ${(props) => props.theme.bannerPadding}px;
`;
