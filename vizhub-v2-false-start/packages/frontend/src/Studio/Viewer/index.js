import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import logo from '../../svg/logo.svg';
import { ViewerDataContext } from '../ViewerDataContext';
import { OwnerInfo } from './OwnerInfo';
import {
  FullScreen,
  /*Fork,*/
  Edit,
  Upvote,
  Downvote,
  Share,
  Download
} from './Actions';
import { Comments } from './Comments';
import { ForkedFrom } from './ForkedFrom';
import { avatarUrl } from './avatarUrl';
import { formatViewCount } from './formatViewCount';
import { Runner } from './Runner';
import {
  Wrapper,
  Padded,
  Header,
  TitleActions,
  Logo,
  HeaderAvatar,
  Description,
  TitleViewCount,
  Actions,
  Title,
  SmallText,
  Provenance
} from './styles';

export const Viewer = withTheme(({ theme }) => {
  const {
    vizData,
    userData,
    authenticatedUserId,
    ownerUserId,
    comments
  } = useContext(ViewerDataContext);

  const { viewCount } = vizData;

  const authenticatedUserData = userData[authenticatedUserId];
  const ownerUserData = userData[ownerUserId];

  const publishDate = new Date();
  const title = 'Visualization Title';
  const upvotes = 2345;
  const downvotes = 5;

  return (
    <Wrapper>
      <Padded>
        <Header>
          <Logo src={logo} />
          <HeaderAvatar
            src={avatarUrl(authenticatedUserData, theme.headerHeight)}
          />
        </Header>
      </Padded>
      <Runner />
      <TitleActions>
        <Padded>
          <TitleViewCount>
            <Title>{title}</Title>
            <SmallText>{formatViewCount(viewCount)} views</SmallText>
          </TitleViewCount>
        </Padded>
        <Actions>
          <Upvote upvotes={upvotes} />
          <Downvote downvotes={downvotes} />
          <Share />
          {/*<Fork />*/}
          <Edit />
          <Download />
          <FullScreen />
        </Actions>
      </TitleActions>
      <Provenance>
        <OwnerInfo user={ownerUserData} publishDate={publishDate} />
        <ForkedFrom />
      </Provenance>
      <Padded>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Description>
        <Comments userData={userData} comments={comments} />
      </Padded>
    </Wrapper>
  );
});
