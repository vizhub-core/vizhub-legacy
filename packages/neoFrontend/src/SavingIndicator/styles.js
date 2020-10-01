import styled from 'styled-components';

export const Text = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: ${(props) => props.theme.text.tiny};
  line-height: 20px;
  color: #797979;
  margin-right: 8px;
`;

export const Indicator = styled.div`
  width: 10px;
  height: 10px;

  background: ${(props) => (props.saving ? '#FFB951' : '#73D129')};
  border-radius: 100px;
`;
