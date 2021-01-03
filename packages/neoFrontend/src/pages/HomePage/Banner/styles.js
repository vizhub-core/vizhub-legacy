import styled from 'styled-components';
import { Button } from '../../../Button';
import { isMobile } from '../../../mobileMods';
import { Z_ABOVE } from '../../../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${isMobile ? 'column' : 'row'};
  height: ${isMobile ? 600 : 400}px;
  position: relative;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => props.theme.dark};
  margin: ${isMobile ? '6px 6px 30px 6px' : 0};
  background-image: url(/images/mountains.png);
  background-size: cover;
`;

export const Gradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  @media (max-width: 1200px) {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 40%,
      rgba(255, 255, 255, 0.4) 100%
    );
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  z-index: ${Z_ABOVE};
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  z-index: ${Z_ABOVE};
  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Message = styled.div`
  text-align: left;
`;

export const MessageSmallText = styled.div`
  font-size: 18px;
  text-shadow: #fff 0 0 4px, #fff 0 0 4px, #fff 0 0 4px;
`;

export const MessageLargeText = styled.div`
  font-size: 32px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-shadow: #fff 0 0 4px, #fff 0 0 4px, #fff 0 0 4px;
`;

export const MessageList = styled.ul`
  text-align: left;
`;

export const MessageLink = styled.a`
  color: ${(props) => (props.isRed ? props.theme.attentionGrabber : 'white')};
  text-decoration: underline;
`;

export const CallToAction = styled.div`
  display: flex;
`;

export const MessageButton = styled(Button)`
  margin-top: 20px;
  margin-left: 0px;
`;

export const Iframe = styled.iframe`
  border: none;
  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadow};
`;
