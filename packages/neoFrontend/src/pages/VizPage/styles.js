import styled from 'styled-components';

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.rule};
`;

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DialogTitle = styled.div`
  font-weight: 600;
  font-size: 22px;
`;

export const DialogButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: Inter;
`;

export const SectionTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.lightText};
  padding-top: 32px;
  padding-bottom: 8px;
`;

export const SectionDescription = styled.div`
  font-size: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: ${(props) => props.theme.dark};
`;

export const SubSectionDescription = styled.div`
  font-size: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: ${(props) => props.theme.lightText};
`;

export const Spacer = styled.div`
  margin-top: ${(props) => (props.height === undefined ? 32 : props.height)}px;
`;

export const FormRow = styled.div`
  display: flex;
  height: 48px;
  font-family: Inter;
  font-size: 16px;
  align-items: center;
  position: relative;
`;
