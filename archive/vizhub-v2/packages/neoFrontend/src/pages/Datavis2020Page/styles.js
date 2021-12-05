import styled from 'styled-components';

export const Entries = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Entry = styled.a`
  display: flex;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: ${(props) => props.theme.borderRadiusLarge}px;
  width: 200px;
  margin: 20px;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  justify-content: space-between;
`;

export const EntryTitle = styled.div``;

export const PageTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 3.5rem;
`;

export const PlayListTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.5rem;
`;
