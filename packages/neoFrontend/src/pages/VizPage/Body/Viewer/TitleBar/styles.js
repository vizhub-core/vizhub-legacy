import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const Voter = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  user-select: none;
  flex: 1;
  justify-content: flex-end;
`;

export const VoteIcon = styled.div`
  margin-left: ${props => (props.leftmost ? '4px' : '13px')};
  margin-right: 4px;
  line-height: 1;
  cursor: ${props => (props.canVote ? 'pointer' : 'not-allowed')};
`;
