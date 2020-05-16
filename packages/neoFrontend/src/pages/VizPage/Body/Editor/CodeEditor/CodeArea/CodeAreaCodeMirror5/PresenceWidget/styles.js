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
  position: absolute;
  ${(props) => (props.isFirstLine ? 'bottom' : 'top')}: -${
  presenceAvatarSize - verticalOffset
}px;
  left: -${presenceAvatarSize / 4}px;
  border-radius: ${presenceAvatarSize}px;
`;
