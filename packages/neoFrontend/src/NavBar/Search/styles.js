import styled from 'styled-components';

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  font-family: Poppins;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.55);
  border: none;
  padding-left: 10px;
`;

export const Form = styled.form`
  padding-left: ${(props) => props.theme.bannerPadding}px;
  padding-right: ${(props) => props.theme.bannerPadding}px;
`;
