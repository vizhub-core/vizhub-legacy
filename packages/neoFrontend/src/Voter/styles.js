import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  user-select: none;
  justify-content: flex-end;
`;

export const VoteIcon = styled.div`
  margin-left: ${(props) => (props.leftmost ? '4px' : '13px')};
  margin-right: 4px;
  line-height: 1;
  cursor: ${(props) => (props.canVote ? 'pointer' : 'not-allowed')};
`;
