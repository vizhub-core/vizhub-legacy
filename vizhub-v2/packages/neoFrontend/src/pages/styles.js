// Common styles used in multiple pages.
import styled from 'styled-components';
import { Clickable, breathableHorizontal } from '../styles';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${breathableHorizontal}
`;

export const WideContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
`;

export const Title = styled.div`
  font-size: 22px;
`;

export const DevsOnly = styled.div`
  margin-top: 40px;
  margin-bottom: 5px;
  font-size: 10px;
  color: ${(props) => props.theme.attentionGrabber};
`;

export const Centering = styled.div`
  display: flex;
  justify-content: center;
`;

export const Text = styled.div`
  max-width: 960px;
  padding: 10px;
`;

export const Icon = styled(Clickable)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LargeIcon = styled(Icon)`
  height: 40px;
  padding-right: ${(props) => (props.rightmost ? 10 : 7)}px;
  padding-left: ${(props) => (props.leftmost ? 10 : 7)}px;
`;

export const CopyWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Copy = styled.div`
  max-width: 960px;
`;
