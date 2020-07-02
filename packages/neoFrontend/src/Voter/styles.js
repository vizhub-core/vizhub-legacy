import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  user-select: none;
  justify-content: flex-end;
`;

export const VoteIcon = styled.div`
  margin-left: ${(props) => (props.leftmost ? '5px' : '13px')};
  margin-right: 4px;
  cursor: ${(props) => (props.canVote ? 'pointer' : 'not-allowed')};
  display: flex;
`;
