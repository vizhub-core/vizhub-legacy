import styled from 'styled-components';

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DialogTitle = styled.div`
  font-weight: 600;
  font-size: 22px;
`;

//export const DialogButtons = styled.div`
//  display: flex;
//  justify-content: flex-end;
//  padding-top: 32px;
//`;

export const SectionTitle = styled.div`
  font-size: 16px;
  color: #797979;
  padding-top: 32px;
  padding-bottom: 8px;
  font-family: Inter;
`;

export const SectionDescription = styled.div`
  font-size: 14px;
  padding-bottom: 24px;
  color: ${props => props.theme.dark};
`;
