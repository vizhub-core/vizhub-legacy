import styled from 'styled-components';

export const Wrapper = styled.span`
  position: absolute;
  border-right-style: solid;
  mix-blend-mode: difference;
`;

export const presenceAvatarSize = 16;
const verticalOffset = 2;

export const PresenceAvatar = styled.img`
  width: ${presenceAvatarSize}px;
  height: ${presenceAvatarSize}px;
  border-radius: ${presenceAvatarSize}px;
  box-shadow: 0 0 0 2px ${(props) => props.userColor};
`;

const vertical = presenceAvatarSize - verticalOffset;

export const PresenceAvatarContainer = styled.div`
  position: absolute;
  ${(props) => (props.isFirstLine ? 'bottom' : 'top')}: -${vertical}px;
  left: -${presenceAvatarSize / 4}px;
`;
