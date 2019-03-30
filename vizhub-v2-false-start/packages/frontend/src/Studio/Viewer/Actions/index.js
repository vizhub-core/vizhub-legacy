import React, { useContext } from 'react';
import { format } from 'd3-format';
import { URLStateContext } from '../../../contexts';
import {
  ForkSVG,
  FullScreenSVG,
  EditSVG,
  UpvoteSVG,
  DownvoteSVG,
  ShareSVG,
  DownloadSVG
} from '../../../icons';
import { Wrapper, Icon } from './styles';

export const formatVotes = format(',');

//export const FullScreenStandalone = () => (
//  <div style={{ width: '40px', height: '40px' }}>
//    <FullScreenSVG />
//  </div>
//);

const Action = ({ svg: SVG, onClick, children, desktopOnly }) => (
  <Wrapper onClick={onClick} desktopOnly={desktopOnly}>
    <Icon>
      <SVG />
    </Icon>
    {children}
  </Wrapper>
);

export const FullScreen = () => <Action svg={FullScreenSVG}>Fullscreen</Action>;

export const Fork = () => <Action svg={ForkSVG}>Fork</Action>;

export const Edit = ({ onClick }) => {
  const { toggleConfigurator } = useContext(URLStateContext);

  return (
    <Action svg={EditSVG} onClick={toggleConfigurator}>
      Edit
    </Action>
  );
};

export const Upvote = ({ upvotes }) => (
  <Action svg={UpvoteSVG}>{formatVotes(upvotes)}</Action>
);

export const Downvote = ({ downvotes }) => (
  <Action svg={DownvoteSVG}>{formatVotes(downvotes)}</Action>
);

export const Share = () => <Action svg={ShareSVG}>Share</Action>;

export const Download = () => (
  <Action desktopOnly={true} svg={DownloadSVG}>
    Download
  </Action>
);
